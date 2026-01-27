"use client";

import { Button } from "@/modules/ui/button";
import { clearTable } from "../actions/ClearTable.actions";
import { useState } from "react";
import toast from "react-hot-toast";

export const DashboardClearTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClearTable = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar TODOS los empleos de la tabla? Esta acción no se puede deshacer.",
    );

    if (!confirmed) return;

    setIsLoading(true);
    try {
      const result = await clearTable();

      if (result.success) {
        toast.success("Tabla limpiada exitosamente");
        window.location.reload();
      } else {
        toast.error(`Error al limpiar la tabla: ${result.error}`);
      }
    } catch (error) {
      toast.error("Error inesperado al limpiar la tabla");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className="cursor-pointer border border-red-600 px-6 py-5 transition-colors duration-300 hover:bg-transparent hover:text-red-600"
      onClick={handleClearTable}
      disabled={isLoading}
    >
      {isLoading ? "Limpiando..." : "Limpiar Tabla de Empleos"}
    </Button>
  );
};
