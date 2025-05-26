import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const InputField = ({ error, registration, ...props }: InputFieldProps) => {
  return (
    <div>
      <input
        className="w-full bg-gray-200 rounded-md px-4 py-3 text-black"
        {...registration}
        {...props}
      />
      {error ? (
        <p className="text-red-600 text-sm">{error.message}</p>
      ) : props.placeholder === "Contraseña" ? (
        <div className="text-sm text-gray-500 mt-1">
          Debe tener al menos 6 caracteres
        </div>
      ) : null}
    </div>
  );
};
