"use client";

import { Form } from "@modules/ui/form";
import { useEditForm } from "@modules/Dashboard/features/edit/hooks/useEditForm";
import { Label } from "@modules/ui/label";
import { RenderFormField } from "@/modules/shared/components/RenderFormField";
import { Button } from "@/modules/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { EmployeeType } from "@modules/Dashboard/types/employee.type";

export const DashEditForm = ({
  employee,
}: {
  employee: EmployeeType | null;
}) => {
  const {
    editEmployeeForm,
    onSubmit,
    TYPE_OF_EMPLOYMENT,
    REGIONAL_OFFICE,
    isSubmitting,
  } = useEditForm({ employee });

  return (
    <div className="mx-auto mt-5 w-full">
      <Form {...editEmployeeForm}>
        <form
          onSubmit={editEmployeeForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Código
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="code"
                type="text"
                placeholder="Código del empleo"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Plaza Vacante
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="vacancy"
                type="text"
                placeholder="Titulo de la Vacante"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Industria
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="industry"
                type="text"
                placeholder="Industria de la Vacante"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Ubicación
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="location"
                type="text"
                placeholder="Ubicación de la Vacante"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Salario
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="salary"
                type="number"
                placeholder="Salario de la Vacante"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Horas y días de trabajo
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="hoursJob"
                type="text"
                placeholder="Horas y días de trabajo"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Requisitos Académicos
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="academicRequirements"
                renderMulti
                placeholder="Requerimientos Académicos"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Requisitos de licencia
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="licenseRequirements"
                renderMulti
                placeholder="Requisitos de licencia"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Requisitos de certificado
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="certificateRequirements"
                renderMulti
                placeholder="Requerimientos de certificado"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Requisitos de experiencia
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="experienceRequirements"
                type="text"
                placeholder="Experiencia Requerida"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Tipo de empleo
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="typeOfEmployment"
                renderSelect
                options={TYPE_OF_EMPLOYMENT}
                placeholder="Tipo de empleo"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Habilidades
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="skills"
                renderMulti
                placeholder="Habilidades requeridas"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Beneficios
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="benefits"
                renderMulti
                placeholder="Beneficios ofrecidos"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Oficina Regional
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="regionalOffice"
                renderSelect
                placeholder="Oficina Regional"
                options={REGIONAL_OFFICE}
                errors={editEmployeeForm.formState.errors}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label htmlFor="code" className="text-base">
                Link para aplicar
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="linkToApply"
                type="text"
                placeholder="Link para aplicar"
                errors={editEmployeeForm.formState.errors}
              />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <Label htmlFor="vacancy" className="text-base">
                Descripción de la vacante
              </Label>
              <RenderFormField
                control={editEmployeeForm.control}
                name="description"
                renderTextarea
                placeholder="Describe el detalle de la vacante"
                errors={editEmployeeForm.formState.errors}
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
                <span>Actualizando Empleo...</span>
              </div>
            ) : (
              "Actualizar Empleo"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
