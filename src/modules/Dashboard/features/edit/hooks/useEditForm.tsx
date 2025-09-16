"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  addEmployeeSchema,
  AddEmployeeSchemaType,
} from "@modules/Dashboard/features/add/schemas/addEmployee.schema";
import { useAddEmployeeStore } from "@modules/Dashboard/features/add/store/addEmployeeStore";
import { editEmployeeAction } from "@modules/Dashboard/features/edit/actions/editEmployee.actions";
import { toast } from "react-hot-toast";
import { useTransitionRouter } from "next-view-transitions";
import { EmployeeType } from "@modules/Dashboard/types/employee.type";
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

  const defaultValues = useMemo(() => {
    if (!employee) return formData;
    return {
      code: String(employee.code),
      vacancy: employee.vacancy,
      industry: employee.industry,
      location: employee.location,
      salary: String(employee.salary),
      hoursJob: employee.hoursJob,
      description: employee.description,
      academicRequirements: employee.academicRequirements,
      licenseRequirements: employee.licenseRequirements,
      certificateRequirements: employee.certificateRequirements,
      experienceRequirements: employee.experienceRequirements,
      typeOfEmployment: employee.typeOfEmployment,
      skills: employee.skills,
      benefits: employee.benefits,
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
        salary: String(employee.salary),
        hoursJob: employee.hoursJob,
        description: employee.description,
        academicRequirements: employee.academicRequirements || "",
        licenseRequirements: employee.licenseRequirements || "",
        certificateRequirements: employee.certificateRequirements || "",
        experienceRequirements: employee.experienceRequirements,
        typeOfEmployment: employee.typeOfEmployment,
        skills: employee.skills,
        benefits: employee.benefits,
        regionalOffice: employee.regionalOffice,
        linkToApply: employee.linkToApply,
      }).forEach(([key, value]) => {
        updateField(key as keyof EditEmployeeSchemaType, value);
      });
    }
  }, [employee, updateField]);

  // Sync form changes with Zustand store
  useEffect(() => {
    const subscription = editEmployeeForm.watch((value, { name }) => {
      if (name && value[name] !== undefined) {
        updateField(
          name as keyof EditEmployeeSchemaType,
          value[name] as string,
        );
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

    if (employeeResponse) {
      toast.success("Employee edited successfully");
      editEmployeeForm.reset();
      router.push("/dashboard");
    } else {
      toast.error("Error editing employee");
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
