import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/explore', label: 'Explore' },
  { to: '/create', label: 'New Idea' },
  { to: '/my-ideas', label: 'My Ideas' },
  { to: '/ai-trends', label: 'AI Trends' }
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 border-r border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-midnight/30 backdrop-blur">
      <nav className="p-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
