import React, { KeyboardEventHandler } from "react";
import { ControllerRenderProps, Path, FieldValues } from "react-hook-form";

import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string): Option => ({
  label,
  value: label,
});

export const MultiInput = <T extends FieldValues>({
  fields,
  placeholder,
  className,
}: {
  fields: ControllerRenderProps<T, Path<T>>;
  placeholder?: string;
  className?: string;
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        fields.onChange([...(fields.value || []), createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => fields.onChange(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      classNamePrefix={"multi-input"}
      value={fields.value}
    />
  );
};
