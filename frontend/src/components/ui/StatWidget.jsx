import { motion } from 'framer-motion';
import cn from '../../utils/cn.js';

const StatWidget = ({ icon: Icon, label, value, trend, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-glow shadow-primary-500/15', className)}
    >
      <div className="flex items-center gap-3 text-primary-200">
        {Icon && <Icon className="h-6 w-6" />}
        <span className="text-sm font-semibold uppercase tracking-wider text-primary-100/80">{label}</span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-4xl font-semibold text-slate-100">{value}</span>
        {trend && <span className="text-xs font-medium uppercase tracking-wide text-emerald-300">{trend}</span>}
      </div>
    </motion.div>
  );
};

export default StatWidget;
