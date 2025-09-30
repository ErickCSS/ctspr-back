"use client";

import * as React from "react";
import Papa from "papaparse";
import {
  SELECT_FREQUENCY_PAYMENT,
  SELECT_INDUSTRIES,
  SELECT_LOCATION,
  REGIONAL_OFFICE,
} from "@/modules/shared/lib/SelectInifo";
import type { User } from "@supabase/supabase-js";
import { addEmployeeCSVAction } from "@modules/Dashboard/features/add/actions/addEmployeeCSV.actions";
import toast from "react-hot-toast";
import { useTransitionRouter } from "next-view-transitions";
import { IconLoader2 } from "@tabler/icons-react";

type CsvRow = Record<string, string>;

type LabelValue = { label: string; value: string };

const JSONB_COLUMNS = [
  "academicRequirements",
  "licenseRequirements",
  "certificateRequirements",
  "skills",
  "benefits",
] as const;

const REQUIRED_DEFAULT: LabelValue = {
  label: "No requiere",
  value: "No requiere",
};

function toLabelValueArray(input?: string): LabelValue[] {
  // Soporta: "A,B,C" | "A; B; C" | "A | B" | JSON | vacío
  if (!input || !input.trim()) return [REQUIRED_DEFAULT];

  // ¿Viene JSON válido?
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      // Si ya vienen objetos {label,value} o strings
      if (parsed.length === 0) return [REQUIRED_DEFAULT];
      if (typeof parsed[0] === "string") {
        return (parsed as string[]).map((s) => ({
          label: s.trim(),
          value: s.trim(),
        }));
      }
      // asumir {label, value}
      return parsed as LabelValue[];
    }
  } catch {
    // no era JSON, seguimos
  }

  // CSV-like: split por coma, punto y coma o “|”
  const parts = input
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return [REQUIRED_DEFAULT];
  return parts.map((s) => ({ label: s, value: s }));
}

function ensureJsonb(row: CsvRow): CsvRow {
  const next = { ...row };
  for (const col of JSONB_COLUMNS) {
    const value = row[col];
    const arr = toLabelValueArray(value);
    // Para el cliente/preview mantenemos como objeto real (no string escapado).
    // Al servidor le enviaremos JSON real y Supabase lo guarda como jsonb sin parse adicional.
    next[col] = JSON.stringify(arr);
  }
  return next;
}

function normalizeRowForDB(row: CsvRow, user: User): CsvRow {
  const r = ensureJsonb(row);

  // code → 6 dígitos
  if (r.code != null) {
    const clean = String(r.code).replace(/\D/g, "");
    r.code = clean.padStart(6, "0");
  }

  // owner_email fijo si quieres forzarlo
  r.owner_email = user.email || "";

  // min/max_salary numéricos
  if (r.min_salary != null) r.min_salary = String(Number(r.min_salary) || 0);
  if (r.max_salary != null) r.max_salary = String(Number(r.max_salary) || 0);

  // is_deleted boolean
  if (r.is_deleted == null || r.is_deleted === "") r.is_deleted = "false";

  // payment_frequency validaciones simples
  const allowedFreq = new Set(SELECT_FREQUENCY_PAYMENT.map((f) => f.value));
  if (!allowedFreq.has((r.payment_frequency || "").toLowerCase())) {
    r.payment_frequency = "mensual";
  }

  // industry/location/regionalOffice: opcionalmente valida contra tus listas
  // (si no coincide, setea defaults seguros)
  const industries = new Set(SELECT_INDUSTRIES.map((f) => f.value));
  if (!industries.has(r.industry || "")) r.industry = "IT";

  const locations = new Set(SELECT_LOCATION.map((f) => f.value));
  if (!locations.has(r.location || "")) r.location = "remote";

  const offices = new Set(REGIONAL_OFFICE.map((f) => f.value));
  if (!offices.has(r.regionalOffice || "")) r.regionalOffice = "barceloneta";

  // Not-null por tu esquema (fallbacks seguros)
  r.vacancy ??= "";
  r.hoursJob ??= "Full-time";
  r.experienceRequirements ??= "";
  r.typeOfEmployment ??= "Permanent";
  r.linkToApply ??= "https://empleos.ejemplo.com";
  r.description ??= "";
  r.user_id = user.id;
  r.slug ??= `${(r.vacancy || "empleo").toLowerCase().replace(/\s+/g, "-")}-${r.code}`;

  // created_at (si no viene)
  r.created_at ??= new Date().toISOString();

  // deleted_at: vacío → null en el server
  if (r.deleted_at === "") delete r.deleted_at;

  return r;
}

export function UploadEmployeesCSV({ user }: { user: User }) {
  const [rows, setRows] = React.useState<CsvRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const router = useTransitionRouter();

  const onFile = (file: File) => {
    setMessage(null);
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        const normalized = result.data.map((row) =>
          normalizeRowForDB(row, user),
        );
        setRows(normalized);
      },
      error: (err) => setMessage(err.message),
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Enviar al API ya normalizado. Notar que jsonb irá como OBJETO (no string escapado).
      // El API hará JSON.parse por columna antes de insert.
      const employeeResponse = await addEmployeeCSVAction({ data: rows });

      if (employeeResponse) {
        toast.success("Employee added successfully");
        router.push("/dashboard");
      } else {
        toast.error("Error adding employee");
      }

      setMessage(
        `Importación OK. Insertados: ${rows.length} (saltados: ${rows.length})`,
      );
    } catch (e: any) {
      setMessage(e.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />

      {rows.length > 0 && (
        <>
          <div className="text-sm opacity-80">
            {rows.length} filas preparadas. Puedes revisar las primeras 10
            filas:
          </div>
          <div className="max-h-[500px] overflow-auto rounded border">
            <table className="min-w-[900px] text-sm">
              <thead>
                <tr>
                  {Object.keys(rows[0]).map((k) => (
                    <th key={k} className="border-b bg-black/5 p-2 text-left">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((r, i) => (
                  <tr key={i} className="even:bg-black/5/10 odd:bg-black/0">
                    {Object.keys(rows[0]).map((k) => (
                      <td key={k} className="border-b p-2 align-top">
                        {JSONB_COLUMNS.includes(k as any)
                          ? (() => {
                              try {
                                return JSON.stringify(JSON.parse(r[k] ?? "[]"));
                              } catch {
                                return r[k];
                              }
                            })()
                          : String(r[k] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-primaryColor cursor-pointer rounded px-4 py-2 text-white"
          >
            {loading ? (
              <span className="flex items-center gap-x-2">
                <IconLoader2 stroke={1.5} className="animate-spin" />
                Importando...
              </span>
            ) : (
              "Importar a Supabase"
            )}
          </button>
        </>
      )}

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
