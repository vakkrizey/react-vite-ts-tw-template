import type { HTMLAttributes } from 'react';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';
type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant };

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
  danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
};

function Badge({ variant = 'neutral', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export default Badge;
