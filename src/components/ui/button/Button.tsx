import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-violet-500 text-white hover:bg-violet-400',
  secondary:
    'border border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
};

function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}

export default Button;
