"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import { useAddEmployeeStore } from "@modules/Dashboard/features/add/store/addEmployeeStore";
import { editEmployeeAction } from "@modules/Dashboard/features/edit/actions/editEmployee.actions";
import { toast } from "react-hot-toast";
import { useTransitionRouter } from "next-view-transitions";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import {
  editEmployeeSchema,
  EditEmployeeSchemaType,
} from "@modules/Dashboard/features/edit/schemas/editEmployee.schema";

export const useEditForm = ({
  employee,
}: {
  employee: EmployeeType | null;
}) => {
  const { formData, updateField } = useAddEmployeeStore();
  const router = useTransitionRouter();

  // const parseData = (data: any) => {
  //   const parsedData = JSON.parse(data);
  //   return parsedData;
  // };

  const parseData = (data: any) => {
    if (typeof data === "object" && data !== null) {
      return data;
    }

    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.warn("Failed to parse JSON data:", data, error);
        return [];
      }
    }

    return [];
  };

  const defaultValues = useMemo(() => {
    if (!employee) return formData;

    return {
      code: String(employee.code),
      vacancy: employee.vacancy,
      industry: employee.industry,
      location: employee.location,
      min_salary: String(employee.min_salary),
      max_salary: String(employee.max_salary),
      hoursJob: employee.hoursJob,
      description: employee.description,
      payment_frequency: employee.payment_frequency,
      academicRequirements: parseData(employee.academicRequirements),
      licenseRequirements: parseData(employee.licenseRequirements),
      certificateRequirements: parseData(employee.certificateRequirements),
      experienceRequirements: employee.experienceRequirements,
      typeOfEmployment: employee.typeOfEmployment,
      skills: parseData(employee.skills),
      benefits: parseData(employee.benefits),
      regionalOffice: employee.regionalOffice,
      linkToApply: employee.linkToApply,
    };
  }, [employee, formData]);

  const editEmployeeForm = useForm<EditEmployeeSchemaType>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: defaultValues,
  });

  const isSubmitting = editEmployeeForm.formState.isSubmitting;

  // Initialize store with employee data when component loads
  useEffect(() => {
    if (employee) {
      // Update store with employee data
      Object.entries({
        code: String(employee.code),
        vacancy: employee.vacancy,
        industry: employee.industry,
        location: employee.location,
        min_salary: String(employee.min_salary),
        max_salary: String(employee.max_salary),
        hoursJob: employee.hoursJob,
        description: employee.description,
        payment_frequency: employee.payment_frequency,
        academicRequirements: parseData(employee.academicRequirements),
        licenseRequirements: parseData(employee.licenseRequirements),
        certificateRequirements: parseData(employee.certificateRequirements),
        experienceRequirements: employee.experienceRequirements,
        typeOfEmployment: employee.typeOfEmployment,
        skills: parseData(employee.skills),
        benefits: parseData(employee.benefits),
        regionalOffice: employee.regionalOffice,
        linkToApply: employee.linkToApply,
      }).forEach(([key, value]) => {
        updateField(key as keyof EditEmployeeSchemaType, value);
      });
    }
  }, [employee, updateField]);

  // Sync form changes with Zustand store
  useEffect(() => {
    const subscription = editEmployeeForm.watch((value) => {
      // Update all form fields in the store whenever any field changes
      if (value) {
        // Handle each top-level field individually
        Object.keys(value).forEach((fieldName) => {
          const typedFieldName = fieldName as keyof EditEmployeeSchemaType;
          const fieldValue = value[typedFieldName];

          if (fieldValue !== undefined) {
            updateField(typedFieldName, fieldValue);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [editEmployeeForm, updateField]);

  const TYPE_OF_EMPLOYMENT = [
    {
      value: "full-time",
      label: "Full-time",
    },
    {
      value: "part-time",
      label: "Part-time",
    },
    {
      value: "contract",
      label: "Contract",
    },
  ];

  const REGIONAL_OFFICE = [
    {
      value: "barceloneta",
      label: "Barceloneta",
    },
    {
      value: "santurce",
      label: "Santurce",
    },
    {
      value: "las-piedras",
      label: "Las Piedras",
    },
    {
      value: "san-german",
      label: "San Germán",
    },
    {
      value: "salinas",
      label: "Salinas",
    },
  ];

  const onSubmit = async (data: EditEmployeeSchemaType) => {
    const employeeResponse = await editEmployeeAction({
      data,
      oldData: employee,
      employeeId: employee?.id,
    });

    if (employeeResponse && employeeResponse.ok) {
      toast.success(employeeResponse.message);
      editEmployeeForm.reset();
      router.push("/dashboard");
    } else {
      toast.error(employeeResponse?.message || "Error editing employee");
    }
  };

  return {
    editEmployeeForm,
    TYPE_OF_EMPLOYMENT,
    REGIONAL_OFFICE,
    onSubmit,
    isSubmitting,
  };
};
