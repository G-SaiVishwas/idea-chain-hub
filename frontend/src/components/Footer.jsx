const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-white/10 py-10 text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="dark:text-slate-300">&copy; {new Date().getFullYear()} IdeaChain. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
