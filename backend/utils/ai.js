import { openAIClient } from '../config/openai.js';

const defaultResponse = {
  viabilityScore: 50,
  creativityScore: 50,
  marketFitScore: 50,
  summary: 'AI service unavailable. This is a placeholder summary.',
  suggestions: ['Refine your value proposition.', 'Identify target customers.', 'Evaluate differentiation.']
};

export const generateIdeaFeedback = async ({ title, description }) => {
  if (!openAIClient) {
    return { ...defaultResponse };
  }

  const prompt = `You are an expert startup advisor. Given the following idea, provide:
1. Viability score (0-100)
2. Creativity score (0-100)
3. Market fit score (0-100)
4. Summary (<=200 words)
5. Three improvement suggestions

Idea title: ${title}
Idea description: ${description}`;
  try {
    const completion = await openAIClient.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt
    });

    const text = completion.output_text;

    const result = { ...defaultResponse };

  const viabilityMatch = text.match(/Viability score[^0-9]*([0-9]{1,3})/i);
  const creativityMatch = text.match(/Creativity score[^0-9]*([0-9]{1,3})/i);
  const marketFitMatch = text.match(/Market fit score[^0-9]*([0-9]{1,3})/i);
  const summaryMatch = text.match(/Summary[:\-\s]*([\s\S]*?)Suggestions/i);
  const suggestionsMatch = text.match(/Suggestions[:\-\s]*([\s\S]*)/i);

  if (viabilityMatch) result.viabilityScore = Number(viabilityMatch[1]);
  if (creativityMatch) result.creativityScore = Number(creativityMatch[1]);
  if (marketFitMatch) result.marketFitScore = Number(marketFitMatch[1]);
  if (summaryMatch) result.summary = summaryMatch[1].trim();
  if (suggestionsMatch) {
    result.suggestions = suggestionsMatch[1]
      .split(/\n|\d+\.|-/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
  }

  result.viabilityScore = Math.min(Math.max(result.viabilityScore, 0), 100);
  result.creativityScore = Math.min(Math.max(result.creativityScore, 0), 100);
  result.marketFitScore = Math.min(Math.max(result.marketFitScore, 0), 100);

  return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AI feedback generation failed', error);
    return { ...defaultResponse };
  }
};

export const generateWeeklyTrends = async ({ topIdeas }) => {
  if (!openAIClient) {
    return {
      insights: ['AI service unavailable. Insights are deferred.'],
      generatedAt: new Date()
    };
  }

  const ideaSummaries = topIdeas
    .map(
      (idea, index) =>
        `${index + 1}. ${idea.title} — forks: ${idea.forks}, avg rating: ${idea.avgRating.toFixed(2)}\n${idea.description}`
    )
    .join('\n\n');

  const prompt = `You are an AI strategist generating weekly trend insights for startup ideas.
Given the list below, craft up to 10 bullet insights highlighting patterns, opportunities, and recommended actions.

${ideaSummaries}`;
  try {
    const completion = await openAIClient.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt
    });

    const text = completion.output_text;
    const insights = text
      .split(/\n|\r/)
      .map((line) => line.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 10);

    return {
      insights,
      generatedAt: new Date()
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AI weekly trends generation failed', error);
    return {
      insights: ['AI insights temporarily unavailable.'],
      generatedAt: new Date()
    };
  }
};
