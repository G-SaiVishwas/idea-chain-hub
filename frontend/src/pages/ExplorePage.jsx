import { motion } from 'framer-motion';
import IdeaCard from '../components/IdeaCard.jsx';
import useIdeas from '../hooks/useIdeas.js';
import { useIdeaContext } from '../context/IdeaContext.jsx';

const stages = ['all', 'concept', 'prototype', 'live'];
const sorts = [
  { value: 'latest', label: 'Latest' },
  { value: 'topRated', label: 'Top Rated' },
  { value: 'trending', label: 'Trending' }
];

const ExplorePage = () => {
  const { filters, setFilters } = useIdeaContext();
  const { data, isLoading } = useIdeas();

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const ideas = data?.data ?? [];

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">Explore Idea Chains</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Filter by stage or sort by momentum to find ideas worth forking.
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={filters.stage}
            onChange={(e) => updateFilter('stage', e.target.value)}
            className="border border-slate-300 dark:border-white/20 rounded-xl px-4 py-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage === 'all' ? 'All stages' : stage}
              </option>
            ))}
          </select>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="border border-slate-300 dark:border-white/20 rounded-xl px-4 py-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sorts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.header>
      {isLoading ? (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
          <div className="animate-pulse">Loading ideas…</div>
        </div>
      ) : ideas.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400 space-y-4">
          <div className="text-6xl">🔍</div>
          <p className="text-lg">No ideas match these filters yet.</p>
          <p className="text-sm">Share something new or adjust the filters above.</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
