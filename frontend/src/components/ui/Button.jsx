import cn from '../../utils/cn.js';

const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight rounded-full';

const variants = {
  primary: 'bg-primary-500/90 hover:bg-primary-400/90 text-white shadow-glow shadow-primary-500/30',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur',
  ghost: 'bg-transparent hover:bg-white/5 text-primary-100'
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3'
};

const Button = ({ as: Component = 'button', variant = 'primary', size = 'md', className, children, ...props }) => {
  return (
    <Component className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Component>
  );
};

export default Button;
