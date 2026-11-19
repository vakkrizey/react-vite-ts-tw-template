import { useId, type InputHTMLAttributes } from 'react';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
  label: string;
  id?: string;
};

function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      className={`inline-flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 ${className}`}
      htmlFor={checkboxId}
    >
      <input
        className="size-4 accent-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      {label}
    </label>
  );
}

export default Checkbox;
