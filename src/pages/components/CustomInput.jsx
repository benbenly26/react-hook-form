import React from "react";
import "./custom.css";
import { Controller } from "react-hook-form";

export default function CustomInput({
  control,
  name,
  value,
  setValue,
  required,
  mandatory,
  onChange,
  rules,
  type = "text",
  label,
  error,
  placeholder = "Enter...",
}) {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={name}>
            {label}
            {required && " *"}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          rules={rules}
          required={"required"}
          render={({ field, fieldState: { error } }) => (
            <input
              className="input-style"
              {...field}
              type={type}
              placeholder={placeholder}
              style={error ? { borderColor: "red" } : {}}
            />
          )}
        />
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    </>
  );
}
