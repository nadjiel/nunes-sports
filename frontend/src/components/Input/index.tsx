import { FieldValues, FieldPath, UseFormRegister, FieldError } from "react-hook-form";

import "./style.css";

interface Props<FormData extends FieldValues> {
  name: FieldPath<FormData>,
  type: string,
  step?: number,
  label?: string,
  placeholder?: string,
  register: UseFormRegister<FormData>,
  error?: FieldError
}

export function Input<FormData extends FieldValues>({
  name,
  type,
  step,
  label,
  placeholder,
  register,
  error
}: Props<FormData>) {
  return (
    <div>
      { label && <label htmlFor={name}>{label}</label> }
      <input
        id={name}
        type={type}
        step={step}
        placeholder={placeholder}
        {...register(name)}
      />
      { error && <span>{error.message}</span> }
    </div>
  );
}