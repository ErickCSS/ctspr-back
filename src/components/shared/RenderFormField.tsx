import { Input } from "@components/ui/input";
import { FormControl, FormField, FormItem } from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors, FieldPath, FieldValues, Control } from "react-hook-form";
import { Textarea } from "@components/ui/textarea";

interface FlexibleFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
  className?: string;
  showPasswordRequirements?: boolean;
  renderSelect?: boolean;
  renderTextarea?: boolean;
  icons?: React.ReactNode;
  options?: { value: string; label: string }[];
  errors: FieldErrors<T>;
  errorClassName?: string;
}

export const RenderFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
  style,
  className,
  showPasswordRequirements,
  renderSelect,
  renderTextarea,
  icons,
  options,
  errors,
  errorClassName = "text-sm text-red-500",
}: FlexibleFormFieldProps<T>) => {
  const renderSelectField = () => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`focus:border-brandPrimary flex h-12 w-full items-center gap-2 border-[#F7F7F7] bg-[#F7F7F7] text-sm text-zinc-500 focus:ring-0 focus:ring-offset-0 focus:outline-none ${className}`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option, index) => (
                    <SelectItem
                      key={option.value}
                      value={field.value || option.value}
                      className="hover:!bg-brandPrimary hover:!text-white"
                    >
                      <div className="flex items-center gap-2">
                        {Array.isArray(icons) && icons[index]}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            {errors[name] && (
              <div className={errorClassName}>
                {errors[name]?.message as string}
              </div>
            )}
          </FormItem>
        )}
      />
    );
  };

  const renderInput = () => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                className={`focus:border-brandPrimary h-12 w-full border-[#F7F7F7] bg-[#F7F7F7] text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className} `}
                style={style}
              />
            </FormControl>
            {errors[name] && (
              <div className={errorClassName}>
                {showPasswordRequirements && <p>Password must:</p>}
                <div>{errors[name]?.message as string}</div>
              </div>
            )}
          </FormItem>
        )}
      />
    );
  };

  const renderTextareaField = () => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Textarea
                {...field}
                placeholder={placeholder}
                className={`focus:border-brandPrimary h-12 w-full border-[#F7F7F7] bg-[#F7F7F7] text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className} `}
                style={style}
              />
            </FormControl>
            {errors[name] && (
              <div className={errorClassName}>
                {showPasswordRequirements && <p>Password must:</p>}
                <div>{errors[name]?.message as string}</div>
              </div>
            )}
          </FormItem>
        )}
      />
    );
  };

  return renderSelect
    ? renderSelectField()
    : renderTextarea
      ? renderTextareaField()
      : renderInput();
};
