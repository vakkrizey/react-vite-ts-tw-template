import { useId, type InputHTMLAttributes } from 'react';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
};

function Input({ label, hint, error, id, className = '', ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = error ?? hint;
  const messageId = message ? `${inputId}-message` : undefined;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={inputId}>
        {label}
      </label>
      <input
        className={`min-h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 transition outline-none placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-white ${
          error ? 'border-rose-400' : 'border-slate-300 dark:border-slate-700'
        } ${className}`}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        {...props}
      />
      {message && (
        <p className={`text-sm ${error ? 'text-rose-300' : 'text-slate-400'}`} id={messageId}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Input;
