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
    <div className="input-container">
      { label && <label className="input-label" htmlFor={name}>{label}</label> }
      <input
        className="input"
        id={name}
        type={type}
        step={step}
        placeholder={placeholder}
        {...register(name)}
      />
      { error && <span className="input-warning">{error.message}</span> }
    </div>
  );
}