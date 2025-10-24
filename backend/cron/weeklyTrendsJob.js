import cron from 'node-cron';
import sgMail from '@sendgrid/mail';
import Idea from '../models/Idea.js';
import { generateWeeklyTrends } from '../utils/ai.js';

const { SENDGRID_API_KEY, SENDGRID_TRENDS_RECIPIENT, SENDGRID_FROM_EMAIL } = process.env;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const runWeeklyTrendJob = async () => {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const ideas = await Idea.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $addFields: {
        avgRating: {
          $cond: [
            { $gt: ['$ratingCount', 0] },
            { $divide: ['$ratingSum', '$ratingCount'] },
            0
          ]
        }
      }
    },
    {
      $project: {
        title: 1,
        description: 1,
        forks: { $size: '$forks' },
        avgRating: 1
      }
    },
    { $sort: { avgRating: -1, forks: -1 } },
    { $limit: 10 }
  ]);

  const trends = await generateWeeklyTrends({ topIdeas: ideas });
  if (SENDGRID_API_KEY && SENDGRID_TRENDS_RECIPIENT && SENDGRID_FROM_EMAIL) {
    try {
      await sgMail.send({
        to: SENDGRID_TRENDS_RECIPIENT,
        from: SENDGRID_FROM_EMAIL,
        subject: 'IdeaChain Weekly AI Trends',
        text: trends.insights.join('\n'),
        html: `<ul>${trends.insights.map((insight) => `<li>${insight}</li>`).join('')}</ul>`
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to send weekly trends email', error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('Weekly AI Trend Insights generated', trends);
  }
};

cron.schedule('0 9 * * 1', runWeeklyTrendJob, {
  timezone: 'UTC'
});

export default runWeeklyTrendJob;
