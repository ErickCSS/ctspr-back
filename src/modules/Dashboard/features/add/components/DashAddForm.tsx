"use client";

import { Form } from "@modules/ui/form";
import { useAddForm } from "@modules/Dashboard/features/add/hooks/useAddForm";
import { Label } from "@modules/ui/label";
import { RenderFormField } from "@/modules/shared/components/RenderFormField";
import { Button } from "@/modules/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import {
  SELECT_INDUSTRIES,
  SELECT_LOCATION,
  SELECT_EMPLOYMENT,
} from "@modules/shared/lib/SelectInifo";

export const DashAddForm = () => {
  const { addEmployeeForm, onSubmit, REGIONAL_OFFICE, isSubmitting } =
    useAddForm();

  return (
    <div className="mx-auto mt-5 w-full">
      <Form {...addEmployeeForm}>
        <form
          onSubmit={addEmployeeForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Código
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="code"
                type="text"
                placeholder="Código del empleo"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Plaza Vacante
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="vacancy"
                type="text"
                placeholder="Titulo de la Vacante"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Industria
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="industry"
                type="text"
                renderSelect
                options={SELECT_INDUSTRIES}
                placeholder="Industria de la Vacante"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Ubicación
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="location"
                type="text"
                renderSelect
                options={SELECT_LOCATION}
                placeholder="Ubicación de la Vacante"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Salario
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="salary"
                type="number"
                placeholder="Salario de la Vacante"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Horas y días de trabajo
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="hoursJob"
                type="text"
                placeholder="Horas y días de trabajo"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Requisitos Académicos
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="academicRequirements"
                renderMulti
                placeholder="Requerimientos Académicos"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Requisitos de licencia
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="licenseRequirements"
                renderMulti
                placeholder="Requisitos de licencia"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Requisitos de certificado
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="certificateRequirements"
                renderMulti
                placeholder="Requerimientos de certificado"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Requisitos de experiencia
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="experienceRequirements"
                type="text"
                placeholder="Experiencia Requerida"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Tipo de empleo
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="typeOfEmployment"
                renderSelect
                options={SELECT_EMPLOYMENT}
                placeholder="Tipo de empleo"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Habilidades
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="skills"
                renderMulti
                placeholder="Habilidades requeridas"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Beneficios
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="benefits"
                renderMulti
                placeholder="Beneficios ofrecidos"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Oficina Regional
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="regionalOffice"
                renderSelect
                placeholder="Oficina Regional"
                options={REGIONAL_OFFICE}
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Link para aplicar
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="linkToApply"
                type="text"
                placeholder="Link para aplicar"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Descripción de la vacante
              </Label>
              <RenderFormField
                control={addEmployeeForm.control}
                name="description"
                renderTextarea
                placeholder="Describe el detalle de la vacante"
                errors={addEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-secondaryColor min-h-[45px] cursor-pointer text-base text-white transition-colors duration-300 hover:bg-pink-700"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <IconLoader2 stroke={1.5} className="animate-spin" />
                <span>Agregando Empleo...</span>
              </div>
            ) : (
              "Agregar Empleo"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
