import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import DarkModeToggle from './DarkModeToggle.jsx';

const activeClass = ({ isActive }) =>
  isActive
    ? 'text-primary-600 dark:text-primary-400 font-semibold'
    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-midnight/70 backdrop-blur-xl shadow-sm dark:shadow-elevated">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gradient transition-transform hover:scale-105">
          IdeaChain
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/explore" className={activeClass}>
            Explore
          </NavLink>
          <NavLink to="/create" className={activeClass}>
            Create
          </NavLink>
          <NavLink to="/ai-trends" className={activeClass}>
            AI Trends
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-600/40 hover:scale-105"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
