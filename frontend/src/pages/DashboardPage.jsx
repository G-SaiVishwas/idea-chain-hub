import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient.js';
import useAuth from '../hooks/useAuth.js';
import IdeaCard from '../components/IdeaCard.jsx';

const DashboardPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['my-ideas', user?.id],
    queryFn: async () => {
      const response = await apiClient.get(`/ideas?createdBy=${user.id}`);
      return response.data;
    },
    enabled: Boolean(user?.id)
  });

  const ideas = data?.data ?? [];
  const stats = [
    { label: 'Ideas Published', value: ideas.length, gradient: 'from-primary-500 to-primary-700' },
    { label: 'Total Forks', value: ideas.reduce((sum, i) => sum + (i.forkCount || 0), 0), gradient: 'from-secondary-500 to-secondary-700' },
    { label: 'Avg. Rating', value: ideas.length ? (ideas.reduce((sum, i) => sum + (i.averageRating || 0), 0) / ideas.length).toFixed(1) : '0', gradient: 'from-violet-500 to-violet-700' },
  ];

  return (
    <div className="space-y-10">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Hey {user?.name || 'there'}! 👋</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Track your contributions and forked ideas.</p>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Gradient Top Border */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`} />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2">{stat.value}</p>
              </div>
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Ideas */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Your Ideas</h2>
          <Link to="/my-ideas" className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
            Manage All →
          </Link>
        </div>
        {isLoading ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <div className="animate-pulse">Loading your ideas…</div>
          </div>
        ) : ideas.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-3">
            <div className="text-5xl">💡</div>
            <p className="text-lg">No ideas yet.</p>
            <Link to="/create" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-medium hover:scale-105 transition-transform">
              Publish Your First Idea
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
