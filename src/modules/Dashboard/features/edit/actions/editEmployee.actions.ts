"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";
import { EmployeeType } from "@/modules/shared/types/employee.type";

export const editEmployeeAction = async ({
  data,
  oldData,
  employeeId,
}: {
  data: AddEmployeeSchemaType;
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

  if (data.salary !== String(oldData?.salary)) {
    body = {
      ...body,
      salary: data.salary,
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
      academicRequirements: data.academicRequirements.map((item) => item.value),
    };
  }

  if (
    data.licenseRequirements?.map((item) => item.value) !==
    oldData?.licenseRequirements
  ) {
    body = {
      ...body,
      licenseRequirements: data.licenseRequirements.map((item) => item.value),
    };
  }

  if (
    data.certificateRequirements?.map((item) => item.value) !==
    oldData?.certificateRequirements
  ) {
    body = {
      ...body,
      certificateRequirements: data.certificateRequirements.map(
        (item) => item.value,
      ),
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
      skills: data.skills.map((item) => item.value),
    };
  }

  if (data.benefits?.map((item) => item.value) !== oldData?.benefits) {
    body = {
      ...body,
      benefits: data.benefits.map((item) => item.value),
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

  return { ok: true, status: 200, message: "Empleo editado exitosamente." };
};
