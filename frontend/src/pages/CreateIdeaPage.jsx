import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIdea } from '../services/ideaService.js';
import { analyzeIdea } from '../services/aiService.js';
import AIInsightsPanel from '../components/AIInsightsPanel.jsx';

const CreateIdeaPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: { title: '', description: '', tags: '', websiteLinks: '', stage: 'concept' }
  });
  const [aiFeedback, setAIFeedback] = useState(null);
  const [serverError, setServerError] = useState('');
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload) => createIdea(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      reset();
      setAIFeedback(null);
      navigate(`/idea/${data._id}`);
    }
  });

  const analyzeMutation = useMutation({
    mutationFn: (payload) => analyzeIdea(payload),
    onSuccess: (feedback) => setAIFeedback(feedback)
  });

  const onSubmit = async (values) => {
    setServerError('');
    const payload = {
      ...values,
      tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()) : [],
      websiteLinks: values.websiteLinks ? values.websiteLinks.split(',').map((link) => link.trim()) : []
    };
    try {
      await createMutation.mutateAsync(payload);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to publish your idea. Please try again.';
      setServerError(message);
    }
  };

  const previewAI = () => {
    const title = watch('title');
    const description = watch('description');
    if (!title || !description) return;
    analyzeMutation.mutate({ title, description });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6 shadow-sm backdrop-blur"
      >
        <header>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Pitch a New Idea</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Share the vision, execution plan, and resources you need. AI will help you refine viability.
          </p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border-2 border-slate-300 dark:border-white/20 rounded-xl px-4 pt-6 pb-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              {...register('title', { required: true })}
            />
            <label className="absolute left-4 top-2 text-xs font-medium text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 transition-all">
              Title *
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              rows={6}
              placeholder=" "
              className="peer w-full border-2 border-slate-300 dark:border-white/20 rounded-xl px-4 pt-6 pb-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
              {...register('description', { required: true })}
            />
            <label className="absolute left-4 top-2 text-xs font-medium text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 transition-all">
              Description *
            </label>
          </div>

          {/* Tags, Links, Stage Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                className="peer w-full border-2 border-slate-300 dark:border-white/20 rounded-xl px-4 pt-6 pb-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                {...register('tags')}
              />
              <label className="absolute left-4 top-2 text-xs font-medium text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 transition-all">
                Tags (comma-separated)
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                className="peer w-full border-2 border-slate-300 dark:border-white/20 rounded-xl px-4 pt-6 pb-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                {...register('websiteLinks')}
              />
              <label className="absolute left-4 top-2 text-xs font-medium text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 transition-all">
                Website Links
              </label>
            </div>
            <div className="relative">
              <select
                className="peer w-full border-2 border-slate-300 dark:border-white/20 rounded-xl px-4 pt-6 pb-2 bg-white dark:bg-white/5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                {...register('stage')}
              >
                <option value="concept">Concept</option>
                <option value="prototype">Prototype</option>
                <option value="live">Live</option>
              </select>
              <label className="absolute left-4 top-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                Stage
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-primary-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={createMutation.isPending || isSubmitting}
            >
              {createMutation.isPending || isSubmitting ? 'Publishing…' : 'Publish Idea'}
            </button>
            <button
              type="button"
              onClick={previewAI}
              className="px-6 py-3 border-2 border-primary-300 dark:border-primary-500 text-primary-700 dark:text-primary-400 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all disabled:opacity-50"
              disabled={analyzeMutation.isPending}
            >
              {analyzeMutation.isPending ? 'Analyzing…' : '✨ Preview AI Feedback'}
            </button>
          </div>

          {/* Error Display */}
          {serverError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800"
            >
              {serverError}
            </motion.p>
          )}
        </form>
      </motion.section>
      <AIInsightsPanel feedback={aiFeedback} />
    </div>
  );
};

export default CreateIdeaPage;
