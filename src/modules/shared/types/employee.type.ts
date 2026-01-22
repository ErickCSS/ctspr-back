export interface EmployeeType {
  id: number;
  created_at: string;
  code: number;
  vacancy: string;
  industry: string;
  location: string;
  min_salary: number;
  max_salary: number;
  payment_frequency: string;
  hoursJob: string;
  academicRequirements: string[];
  licenseRequirements: string[];
  certificateRequirements: string[];
  experienceRequirements: string;
  typeOfEmployment: string;
  skills: string[];
  benefits: string[];
  regionalOffice: string;
  linkToApply: string;
  description: string;
  is_deleted: boolean;
  deleted_at: string;
  slug: string;
  [key: string]: any;
}
