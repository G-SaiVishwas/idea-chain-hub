import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden -mt-10">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20" />
        <div className="relative max-w-6xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-slate-900 dark:text-slate-50">Build the next big thing with </span>
              <span className="text-gradient block mt-2">IdeaChain</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover, fork, and evolve startup ideas with AI-powered guidance. Collaborate with creators and bring
              innovation to life faster than ever.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link
              to="/create"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full text-lg font-semibold shadow-2xl shadow-primary-600/40 transition-all hover:shadow-primary-600/60 hover:scale-105"
            >
              Start an Idea
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-full text-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
            >
              Explore Chains
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-full text-lg font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 border-t border-slate-200 dark:border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gradient">1000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider">Ideas Shared</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gradient">500+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider">Active Forks</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gradient">AI-Powered</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider">Instant Feedback</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
