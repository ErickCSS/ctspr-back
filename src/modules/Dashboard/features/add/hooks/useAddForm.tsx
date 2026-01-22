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
import { useDashboardEmployeeFiltersStore } from "@modules/Dashboard/store/dahsEmployeeFiltersStore";
import { generateSearchText } from "@modules/shared/utils/generateSearchText";

const initialFormData: AddEmployeeSchemaType = {
  code: "",
  vacancy: "",
  industry: "",
  location: "",
  min_salary: "",
  max_salary: "",
  payment_frequency: "",
  description: "",
  experienceRequirements: "",
  typeOfEmployment: "",
  hoursJob: "",
  academicRequirements: [],
  licenseRequirements: [],
  certificateRequirements: [],
  benefits: [],
  skills: [],
  regionalOffice: "",
  linkToApply: "",
};

export const useAddForm = () => {
  const { updateField, resetForm } = useAddEmployeeStore();
  const { setEmployees } = useDashboardEmployeeFiltersStore();
  const router = useTransitionRouter();

  // Reset the store when the component initializes to ensure clean state
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const addEmployeeForm = useForm<AddEmployeeSchemaType>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: initialFormData,
  });

  const isSubmitting = addEmployeeForm.formState.isSubmitting;

  // Sync form changes with Zustand store
  useEffect(() => {
    const subscription = addEmployeeForm.watch((value) => {
      // Update all form fields in the store whenever any field changes
      if (value) {
        // Handle each top-level field individually
        Object.keys(value).forEach((fieldName) => {
          const typedFieldName = fieldName as keyof AddEmployeeSchemaType;
          const fieldValue = value[typedFieldName];

          if (fieldValue !== undefined) {
            updateField(typedFieldName, fieldValue);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [addEmployeeForm, updateField]);

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
    const dataWithSearch = {
      ...data,
      search_text: generateSearchText(data),
    };
    const employeeResponse = await addEmployeeAction({ data: dataWithSearch });

    if (employeeResponse) {
      toast.success("Employee added successfully");
      addEmployeeForm.reset();
      setEmployees(null);
      router.refresh();
      router.push("/dashboard");
    } else {
      toast.error("Error adding employee");
    }
  };

  return {
    addEmployeeForm,
    REGIONAL_OFFICE,
    onSubmit,
    isSubmitting,
  };
};
