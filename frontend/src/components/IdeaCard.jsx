import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars.jsx';

const IdeaCard = ({ idea }) => {
  const average = idea.ratingCount ? idea.ratingSum / idea.ratingCount : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/idea/${idea._id}`}
        className="block border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-xl dark:hover:shadow-primary-500/20 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {idea.createdBy?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">{idea.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">by {idea.createdBy?.name ?? 'Anonymous'}</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">{idea.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="capitalize px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300 font-medium">
            {idea.stage}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            {idea.forks?.length ?? 0} forks
          </span>
        </div>
        <div className="mb-4">
          <RatingStars value={average} readOnly />
        </div>
        <div className="flex flex-wrap gap-2">
          {idea.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-white/10">
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default IdeaCard;
