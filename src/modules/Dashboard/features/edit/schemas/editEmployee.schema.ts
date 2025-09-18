import { z } from "zod";

export const editEmployeeSchema = z.object({
  code: z
    .string()
    .min(1, "El código es requerido")
    .max(6, "El código debe tener 6 caracteres"),
  vacancy: z.string().min(1, "La vacante es requerida"),
  industry: z.string().min(1, "La industria es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  salary: z.string().min(1, "El salario es requerido"),
  hoursJob: z.string().min(1, "Las horas y dias de trabajo son requeridos"),
  description: z.string().min(1, "La descripción es requerida"),
  academicRequirements: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  licenseRequirements: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  certificateRequirements: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  experienceRequirements: z.string().min(1, "La experiencia es requerida"),
  typeOfEmployment: z.string().min(1, "El tipo de empleo es requerido"),
  skills: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1, "Las habilidades son requeridas"),
  benefits: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1, "Los beneficios son requeridos"),
  regionalOffice: z.string().min(1, "La oficina regional es requerida"),
  linkToApply: z.string().min(1, "El link para aplicar es requerido"),
});

export type EditEmployeeSchemaType = z.infer<typeof editEmployeeSchema>;
