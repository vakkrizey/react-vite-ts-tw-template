type LanguageThemeControlsProps = {
  isRussian: boolean;
  isDark: boolean;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
};

function LanguageThemeControls({
  isRussian,
  isDark,
  onLanguageToggle,
  onThemeToggle,
}: LanguageThemeControlsProps) {
  const buttonClass = `rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/15 text-slate-200 hover:text-white' : 'border-slate-300 text-slate-700 hover:text-slate-950'}`;
  const languageButtonClass = `rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 ${isDark ? 'border-white/15 text-slate-200 hover:border-violet-300/60 hover:text-white' : 'border-slate-300 text-slate-700 hover:border-violet-400 hover:text-slate-950'}`;

  return (
    <div className="flex items-center gap-2">
      <button
        className={buttonClass}
        type="button"
        onClick={onThemeToggle}
        aria-label={isDark ? 'Switch to light theme' : 'Переключить на тёмную тему'}
      >
        {isDark ? '☀' : '☾'}
      </button>
      <button
        className={languageButtonClass}
        type="button"
        onClick={onLanguageToggle}
        aria-label={isRussian ? 'Switch language to English' : 'Переключить язык на русский'}
      >
        {isRussian ? 'EN' : 'RU'}
      </button>
    </div>
  );
}

export default LanguageThemeControls;
