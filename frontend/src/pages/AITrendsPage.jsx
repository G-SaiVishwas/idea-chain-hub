import { useQuery } from '@tanstack/react-query';
import { fetchTrends } from '../services/aiService.js';

const AITrendsPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['ai-trends'], queryFn: fetchTrends });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-800">Weekly AI Trend Insights</h1>
        <p className="text-sm text-slate-500">Top signals synthesized from the most forked and highly rated ideas.</p>
      </header>
      {isLoading ? (
        <div className="py-20 text-center">Generating insights…</div>
      ) : (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
          {data?.insights?.map((insight, index) => (
            <article key={index} className="bg-primary-50/80 border border-primary-100 rounded-xl p-4">
              <h3 className="font-medium text-primary-700">Trend #{index + 1}</h3>
              <p className="text-sm text-slate-600 mt-2">{insight}</p>
            </article>
          ))}
          {data?.generatedAt && (
            <p className="text-xs text-slate-400">Generated at {new Date(data.generatedAt).toLocaleString()}</p>
          )}
        </section>
      )}
    </div>
  );
};

export default AITrendsPage;
