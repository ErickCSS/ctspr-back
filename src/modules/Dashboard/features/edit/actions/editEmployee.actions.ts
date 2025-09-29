"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { EditEmployeeSchemaType } from "@modules/Dashboard/features/edit/schemas/editEmployee.schema";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { revalidatePath } from "next/cache";

export const editEmployeeAction = async ({
  data,
  oldData,
  employeeId,
}: {
  data: EditEmployeeSchemaType;
  oldData: EmployeeType | null;
  employeeId: number | undefined;
}) => {
  const supabase = await createClient();

  let body: any = {};

  if (data.code !== String(oldData?.code)) {
    body = {
      ...body,
      code: data.code,
    };
  }

  if (data.vacancy !== oldData?.vacancy) {
    body = {
      ...body,
      vacancy: data.vacancy,
    };
  }

  if (data.industry !== oldData?.industry) {
    body = {
      ...body,
      industry: data.industry,
    };
  }

  if (data.location !== oldData?.location) {
    body = {
      ...body,
      location: data.location,
    };
  }

  if (data.min_salary !== String(oldData?.min_salary)) {
    body = {
      ...body,
      min_salary: data.min_salary,
    };
  }

  if (data.max_salary !== String(oldData?.max_salary)) {
    body = {
      ...body,
      max_salary: data.max_salary,
    };
  }

  if (data.payment_frequency !== oldData?.payment_frequency) {
    body = {
      ...body,
      payment_frequency: data.payment_frequency,
    };
  }

  if (data.hoursJob !== oldData?.hoursJob) {
    body = {
      ...body,
      hoursJob: data.hoursJob,
    };
  }

  if (data.description !== oldData?.description) {
    body = {
      ...body,
      description: data.description,
    };
  }

  if (
    data.academicRequirements?.map((item) => item.value) !==
    oldData?.academicRequirements
  ) {
    body = {
      ...body,
      academicRequirements: JSON.stringify(data.academicRequirements),
    };
  }

  if (
    data.licenseRequirements?.map((item) => item.value) !==
    oldData?.licenseRequirements
  ) {
    body = {
      ...body,
      licenseRequirements: JSON.stringify(data.licenseRequirements),
    };
  }

  if (
    data.certificateRequirements?.map((item) => item.value) !==
    oldData?.certificateRequirements
  ) {
    body = {
      ...body,
      certificateRequirements: JSON.stringify(data.certificateRequirements),
    };
  }

  if (data.experienceRequirements !== oldData?.experienceRequirements) {
    body = {
      ...body,
      experienceRequirements: data.experienceRequirements,
    };
  }

  if (data.typeOfEmployment !== oldData?.typeOfEmployment) {
    body = {
      ...body,
      typeOfEmployment: data.typeOfEmployment,
    };
  }

  if (data.skills?.map((item) => item.value) !== oldData?.skills) {
    body = {
      ...body,
      skills: JSON.stringify(data.skills),
    };
  }

  if (data.benefits?.map((item) => item.value) !== oldData?.benefits) {
    body = {
      ...body,
      benefits: JSON.stringify(data.benefits),
    };
  }

  if (data.regionalOffice !== oldData?.regionalOffice) {
    body = {
      ...body,
      regionalOffice: data.regionalOffice,
    };
  }

  if (data.linkToApply !== oldData?.linkToApply) {
    body = {
      ...body,
      linkToApply: data.linkToApply,
    };
  }

  const { error } = await supabase
    .from("employees")
    .update(body)
    .eq("id", employeeId)
    .maybeSingle();

  if (error) {
    console.error("Error editing employee:", error);
    return { ok: false, status: 404, message: "No encontrado o sin permiso." };
  }

  revalidatePath("/dashboard");
  return { ok: true, status: 200, message: "Empleo editado exitosamente." };
};
