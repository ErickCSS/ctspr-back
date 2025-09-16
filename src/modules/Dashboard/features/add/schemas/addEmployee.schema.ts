import { z } from "zod";

export const addEmployeeSchema = z.object({
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
  academicRequirements: z.string().optional(),
  licenseRequirements: z.string().optional(),
  certificateRequirements: z.string().optional(),
  experienceRequirements: z.string().min(1, "La experiencia es requerida"),
  typeOfEmployment: z.string().min(1, "El tipo de empleo es requerido"),
  skills: z.string().min(1, "Las habilidades son requeridas"),
  benefits: z.string().min(1, "Los beneficios son requeridos"),
  regionalOffice: z.string().min(1, "La oficina regional es requerida"),
  linkToApply: z.string().min(1, "El link para aplicar es requerido"),
});

export type AddEmployeeSchemaType = z.infer<typeof addEmployeeSchema>;
