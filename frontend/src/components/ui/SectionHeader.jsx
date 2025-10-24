import { motion } from 'framer-motion';
import cn from '../../utils/cn.js';

const SectionHeader = ({ eyebrow, title, description, align = 'left', className }) => {
  const alignment = {
    left: 'items-start text-left',
    center: 'items-center text-center'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', alignment[align], className)}
    >
      {eyebrow && <span className="text-sm font-semibold uppercase tracking-widest text-primary-200/80">{eyebrow}</span>}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
        <span className="text-gradient font-display">{title}</span>
      </h2>
      {description && <p className="max-w-2xl text-base text-slate-300/90">{description}</p>}
    </motion.div>
  );
};

export default SectionHeader;
