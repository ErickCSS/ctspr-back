import { create } from "zustand";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";

interface AddEmployeeStore {
  formData: AddEmployeeSchemaType;
  updateField: (field: keyof AddEmployeeSchemaType, value: string) => void;
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
  benefits: "",
  skills: "",
  regionalOffice: "",
  linkToApply: "",
};

export const useAddEmployeeStore = create<AddEmployeeStore>((set) => ({
  formData: initialFormData,
  updateField: (field, value) =>
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
