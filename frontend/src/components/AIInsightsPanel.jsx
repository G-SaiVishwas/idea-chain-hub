import { motion, AnimatePresence } from 'framer-motion';

const ScoreBar = ({ label, value, gradient }) => (
  <div>
    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
      <span className="font-medium">{label}</span>
      <span className="font-bold">{value}/10</span>
    </div>
    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
      />
    </div>
  </div>
);

const AIInsightsPanel = ({ feedback }) => {
  if (!feedback) {
    return (
      <aside className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/20 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800/30 rounded-2xl p-8 text-center space-y-4 backdrop-blur">
        <div className="text-5xl">✨</div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">AI Insights</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Fill in the title and description, then click <strong>Preview AI Feedback</strong> to see viability analysis.
          </p>
        </div>
      </aside>
    );
  }

  const isPlaceholder = feedback.summary?.includes('AI service unavailable');

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key="insights"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/20 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800/30 rounded-2xl p-8 space-y-6 backdrop-blur"
      >
        <header className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl">
            🤖
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg">AI Viability Analysis</h3>
        </header>

        {isPlaceholder && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2"
          >
            Connect your OpenAI API key in the backend configuration to replace the placeholder analysis with real AI insights.
          </motion.p>
        )}

        {/* Scores */}
        <div className="space-y-4">
          <ScoreBar label="Viability" value={feedback.viabilityScore || 0} gradient="from-violet-500 to-violet-700" />
          <ScoreBar label="Creativity" value={feedback.creativityScore || 0} gradient="from-cyan-500 to-cyan-700" />
          <ScoreBar label="Market Fit" value={feedback.marketFitScore || 0} gradient="from-orange-500 to-orange-700" />
        </div>

        {/* Summary */}
        {feedback.summary && (
          <article className="bg-primary-100 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300">
            <h4 className="font-semibold text-primary-700 dark:text-primary-400 mb-2">📋 Summary</h4>
            <p>{feedback.summary}</p>
          </article>
        )}

        {/* Suggestions */}
        {feedback.suggestions?.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">💡 Suggestions</h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {feedback.suggestions.map((sug, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-primary-600 dark:text-primary-400 mt-0.5">→</span>
                  <span>{sug}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.aside>
    </AnimatePresence>
  );
};

export default AIInsightsPanel;
