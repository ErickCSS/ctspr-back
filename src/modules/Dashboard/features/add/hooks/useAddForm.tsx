"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  addEmployeeSchema,
  AddEmployeeSchemaType,
} from "@modules/Dashboard/features/add/schemas/addEmployee.schema";
import { useAddEmployeeStore } from "@modules/Dashboard/features/add/store/addEmployeeStore";
import { addEmployeeAction } from "../actions/addEmployee.actions";
import { toast } from "react-hot-toast";
import { useTransitionRouter } from "next-view-transitions";

export const useAddForm = () => {
  const { formData, updateField } = useAddEmployeeStore();
  const router = useTransitionRouter();

  const addEmployeeForm = useForm<AddEmployeeSchemaType>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: formData,
  });

  const isSubmitting = addEmployeeForm.formState.isSubmitting;

  // Sync form changes with Zustand store
  useEffect(() => {
    const subscription = addEmployeeForm.watch((value, { name }) => {
      if (name && value[name] !== undefined) {
        updateField(name as keyof AddEmployeeSchemaType, value[name] as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [addEmployeeForm, updateField]);

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

  const onSubmit = async (data: AddEmployeeSchemaType) => {
    const employeeResponse = await addEmployeeAction({ data });

    if (employeeResponse) {
      toast.success("Employee added successfully");
      addEmployeeForm.reset();
      router.push("/dashboard");
    } else {
      toast.error("Error adding employee");
    }
  };

  return {
    addEmployeeForm,
    TYPE_OF_EMPLOYMENT,
    REGIONAL_OFFICE,
    onSubmit,
    isSubmitting,
  };
};
