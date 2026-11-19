import { useId, type SelectHTMLAttributes } from 'react';

export type SelectOption = { label: string; value: string };
type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children'> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

function Select({ label, options, placeholder, id, className = '', ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={selectId}>
        {label}
      </label>
      <select
        className={`min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 transition outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${className}`}
        id={selectId}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
