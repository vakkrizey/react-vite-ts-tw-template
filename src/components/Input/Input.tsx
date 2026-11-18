import "./Input.css";

import type { InputHTMLAttributes } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? "input";

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`input-field ${error ? "input-field--error" : ""}`}
        aria-invalid={Boolean(error)}
        {...props}
      />

      {error && <span className="input-error">{error}</span>}
    </div>
  );
}
