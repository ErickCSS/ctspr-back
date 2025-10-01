"use client";

import React from "react";
import { useTransitionRouter } from "next-view-transitions";
import { addEmployeeCSVAction } from "../actions/addEmployeeCSV.actions";
import { toast } from "react-hot-toast";
import type { User } from "@supabase/supabase-js";
import { SELECT_FREQUENCY_PAYMENT } from "@/modules/shared/lib/SelectInifo";
import { SELECT_INDUSTRIES } from "@/modules/shared/lib/SelectInifo";
import { SELECT_LOCATION } from "@/modules/shared/lib/SelectInifo";
import { REGIONAL_OFFICE } from "@/modules/shared/lib/SelectInifo";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { useDashboardEmployeeFiltersStore } from "@/modules/Dashboard/store/dahsEmployeeFiltersStore";
import { generateSearchText } from "@/modules/shared/utils/generateSearchText";

export const useAddCSV = ({ user }: { user: User }) => {
  const [rows, setRows] = React.useState<CsvRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const { setEmployees } = useDashboardEmployeeFiltersStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

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
    if (!input || !input.trim()) return [REQUIRED_DEFAULT];

    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return [REQUIRED_DEFAULT];
        if (typeof parsed[0] === "string") {
          return (parsed as string[]).map((s) => ({
            label: s.trim(),
            value: s.trim(),
          }));
        }
        return parsed as LabelValue[];
      }
    } catch {
      // no era JSON, seguimos
    }

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
      next[col] = JSON.stringify(arr);
    }
    return next;
  }

  function normalizeRowForDB(row: CsvRow, user: User): CsvRow {
    const r = ensureJsonb(row);

    if (r.code != null) {
      const clean = String(r.code).replace(/\D/g, "");
      r.code = clean.padStart(6, "0");
    }

    r.owner_email = user.email || "";

    if (r.min_salary != null) r.min_salary = String(Number(r.min_salary) || 0);
    if (r.max_salary != null) r.max_salary = String(Number(r.max_salary) || 0);

    if (r.is_deleted == null || r.is_deleted === "") r.is_deleted = "false";

    const allowedFreq = new Set(SELECT_FREQUENCY_PAYMENT.map((f) => f.value));
    if (!allowedFreq.has((r.payment_frequency || "").toLowerCase())) {
      r.payment_frequency = "mensual";
    }

    const industries = new Set(SELECT_INDUSTRIES.map((f) => f.value));
    if (!industries.has(r.industry || "")) r.industry = "IT";

    const locations = new Set(SELECT_LOCATION.map((f) => f.value));
    if (!locations.has(r.location || "")) r.location = "remote";

    const offices = new Set(REGIONAL_OFFICE.map((f) => f.value));
    if (!offices.has(r.regionalOffice || "")) r.regionalOffice = "barceloneta";

    r.vacancy ??= "";
    r.hoursJob ??= "Full-time";
    r.experienceRequirements ??= "";
    r.typeOfEmployment ??= "Full-time";
    r.linkToApply ??= "https://empleos.ejemplo.com";
    r.description ??= "";
    r.user_id = user.id;
    r.slug ??= `${(r.vacancy || "empleo").toLowerCase().replace(/\s+/g, "-")}-${r.code}`;
    r.created_at = new Date().toISOString();
    r.is_deleted = "FALSE";
    if (r.deleted_at === "") delete r.deleted_at;

    r.search_text = generateSearchText({
      vacancy: r.vacancy,
      description: r.description,
      industry: r.industry,
      location: r.location,
      typeOfEmployment: r.typeOfEmployment,
      regionalOffice: r.regionalOffice,
    });

    return r;
  }

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.[0] && files[0].type === "text/csv") {
      onFile(files[0]);
    } else {
      setMessage("Por favor, arrastra un archivo CSV válido");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFile(e.target.files[0]);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const employeeResponse = await addEmployeeCSVAction({ data: rows });

      if (employeeResponse) {
        toast.success("Employee added successfully");
        setEmployees(null);
        router.refresh();
        router.push("/dashboard");
      } else {
        toast.error("Error adding employee");
      }

      setMessage(
        `Importación OK. Insertados: ${rows.length} (saltados: ${rows.length})`,
      );
    } catch (e: any) {
      let errorMessage = "Error inesperado";

      if (e.message === "23505") {
        errorMessage =
          "Error: Ya existe un empleo con ese código. Por favor verifica los datos duplicados.";
      } else if (e.message === "23502") {
        errorMessage = "Error: Faltan campos obligatorios en el CSV.";
      } else if (e.message === "23503") {
        errorMessage = "Error de referencia en los datos.";
      } else if (e.message) {
        // Si tiene un mensaje personalizado, usarlo
        errorMessage =
          typeof e.message === "string"
            ? e.message
            : "Error al importar los empleos";
      }

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    rows,
    loading,
    message,
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleClickUpload,
    onSubmit,
    setRows,
    JSONB_COLUMNS,
  };
};
