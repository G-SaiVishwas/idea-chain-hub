import cn from '../../utils/cn.js';

const Badge = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-100 shadow-inner shadow-primary-500/10',
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
