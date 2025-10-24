import cn from '../../utils/cn.js';

const Card = ({ className, children, as: Component = 'div', glow = false, ...props }) => {
  return (
    <Component
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-elevated',
        glow && 'shadow-glow shadow-primary-500/40',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default Card;
