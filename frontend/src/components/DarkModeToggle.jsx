import { useEffect, useState } from 'react';

const getInitialTheme = () => {
  if (typeof document === 'undefined') return false;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark';
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark || document.documentElement.classList.contains('dark');
};

const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
      const meta = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', '#0b1120');
      document.head.appendChild(meta);
    } else {
      root.classList.remove('dark');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
      const meta = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', '#f8fafc');
      document.head.appendChild(meta);
    }
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled((prev) => !prev)}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:text-primary-600 dark:border-white/15 dark:text-slate-300 dark:hover:text-primary-300 backdrop-blur"
      aria-label="Toggle dark mode"
    >
      {enabled ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
