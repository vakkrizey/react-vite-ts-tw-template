import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLElement>;

function Card({ className = '', ...props }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`}
      {...props}
    />
  );
}

export default Card;
