"use client";

import * as React from "react";

import type { User } from "@supabase/supabase-js";

import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@modules/ui/button";
import { useAddCSV } from "../hooks/useAddCSV";

export function UploadEmployeesCSV({ user }: { user: User }) {
  const {
    rows,
    loading,
    message,
    isDragging,
    fileInputRef,
    JSONB_COLUMNS,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClickUpload,
    onSubmit,
    setRows,
    handleFileSelect,
  } = useAddCSV({ user });

  return (
    <div className="space-y-6">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 transition-all duration-200 ${
          isDragging
            ? "border-primaryColor bg-primaryColor/10 scale-[1.02]"
            : "hover:border-primaryColor hover:bg-primaryColor/5 border-gray-300 bg-gray-50"
        } `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div
            className={`rounded-full p-4 transition-colors ${
              isDragging ? "bg-primaryColor/20" : "bg-gray-200"
            }`}
          >
            <svg
              className={`h-12 w-12 transition-colors ${
                isDragging ? "text-primaryColor" : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-700">
              {isDragging
                ? "Suelta el archivo aquí"
                : "Arrastra tu archivo CSV aquí"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              o haz clic para seleccionar un archivo
            </p>
          </div>

          <div className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm">
            Solo archivos .CSV
          </div>
        </div>
      </div>

      {/* Preview Table */}
      {rows.length > 0 && (
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Vista Previa
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {rows.length} {rows.length === 1 ? "fila" : "filas"} preparadas.
                Mostrando las primeras 10:
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setRows([])}
              className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar
            </Button>
          </div>

          <div className="max-h-[500px] overflow-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr>
                  {Object.keys(rows[0]).map((k) => (
                    <th
                      key={k}
                      className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase"
                    >
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.slice(0, 10).map((r, i) => (
                  <tr key={i} className="transition-colors hover:bg-gray-50">
                    {Object.keys(rows[0]).map((k) => (
                      <td
                        key={k}
                        className="max-w-xs truncate px-4 py-3 text-gray-900"
                      >
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

          <div className="flex justify-end pt-4">
            <Button
              onClick={onSubmit}
              disabled={loading}
              variant="default"
              className="bg-primaryColor flex cursor-pointer items-center gap-2 rounded-lg !px-6 !py-6 font-medium text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <IconLoader2 stroke={1.5} className="h-5 w-5 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Importar a Supabase
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Message */}
      {message && rows.length > 0 && (
        <div
          className={`rounded-lg border p-4 ${
            message.includes("Error") || message.includes("error")
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
