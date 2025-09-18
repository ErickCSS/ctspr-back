import { create } from "zustand";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";

interface AddEmployeeStore {
  formData: AddEmployeeSchemaType;
  updateField: (
    field: keyof AddEmployeeSchemaType,
    value: string | Array<{ label?: string; value?: string } | undefined>,
  ) => void;
  resetForm: () => void;
}

const initialFormData: AddEmployeeSchemaType = {
  code: "",
  vacancy: "",
  industry: "",
  location: "",
  salary: "",
  description: "",
  experienceRequirements: "",
  typeOfEmployment: "",
  hoursJob: "",
  academicRequirements: [
    {
      label: "",
      value: "",
    },
  ],
  licenseRequirements: [
    {
      label: "",
      value: "",
    },
  ],
  certificateRequirements: [
    {
      label: "",
      value: "",
    },
  ],
  benefits: [
    {
      label: "",
      value: "",
    },
  ],
  skills: [
    {
      label: "",
      value: "",
    },
  ],
  regionalOffice: "",
  linkToApply: "",
};

export const useAddEmployeeStore = create<AddEmployeeStore>((set) => ({
  formData: initialFormData,
  updateField: (field: keyof AddEmployeeSchemaType, value: any) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      formData: initialFormData,
    }),
}));
