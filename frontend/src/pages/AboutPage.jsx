import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';

const features = [
  {
    icon: '🔗',
    title: 'Idea Forking & Evolution',
    description:
      'Fork any idea to create your own variation. Build upon existing concepts, remix them, and watch how ideas evolve into entire innovation chains. Every fork maintains lineage, creating a transparent genealogy of creativity.'
  },
  {
    icon: '🤖',
    title: 'AI-Powered Viability Analysis',
    description:
      'Get instant feedback on your ideas with GPT-4 powered analysis. Receive viability scores, creativity ratings, market fit assessments, and actionable suggestions to refine your concept before you invest time and resources.'
  },
  {
    icon: '⭐',
    title: 'Community Rating System',
    description:
      'Let the community validate your ideas. Rate concepts from 1-5 stars, see average ratings, and discover which ideas resonate most. The collective intelligence helps surface the most promising innovations.'
  },
  {
    icon: '💬',
    title: 'Threaded Discussions',
    description:
      'Engage in rich conversations around each idea. Comment, reply, debate execution strategies, identify risks, and collaborate with fellow innovators. Every discussion thread adds depth to the concept.'
  },
  {
    icon: '📊',
    title: 'Visual Idea Trees',
    description:
      'Explore interactive fork trees powered by React Flow. Visualize how ideas branch, merge, and evolve. See the entire ecosystem of related concepts at a glance and discover unexpected connections.'
  },
  {
    icon: '📈',
    title: 'Weekly AI Trend Reports',
    description:
      'Receive automated weekly insights synthesized from the most-forked and highest-rated ideas. Spot emerging patterns, identify hot sectors, and stay ahead of innovation trends in the startup ecosystem.'
  },
  {
    icon: '🏷️',
    title: 'Smart Tagging & Filters',
    description:
      'Organize ideas with flexible tags (AI, fintech, SaaS, etc.). Filter by stage (concept, prototype, live), sort by ratings or trending status, and quickly find ideas that match your interests or expertise.'
  },
  {
    icon: '🔐',
    title: 'Secure Authentication',
    description:
      'Your account and ideas are protected with JWT-based authentication. Only you can edit or delete your published ideas. Collaborate confidently knowing your contributions are tracked and secure.'
  },
  {
    icon: '🎨',
    title: 'Modern Dark Mode',
    description:
      'Enjoy a beautifully crafted interface with seamless light/dark mode switching. Glassmorphic panels, smooth animations, and gradient accents create an immersive experience that adapts to your preference.'
  }
];

const howItWorks = [
  {
    step: '01',
    title: 'Share Your Idea',
    description: 'Describe your startup concept, add tags, set the stage (concept, prototype, or live), and optionally include website links or images.'
  },
  {
    step: '02',
    title: 'Get AI Feedback',
    description: 'Our AI analyzes your idea instantly, providing viability scores, creativity ratings, market fit analysis, and tailored suggestions for improvement.'
  },
  {
    step: '03',
    title: 'Community Engagement',
    description: 'Watch as other innovators discover, rate, comment, and fork your idea. Engage in discussions, answer questions, and refine your concept based on feedback.'
  },
  {
    step: '04',
    title: 'Fork & Iterate',
    description: 'Found an idea you love? Fork it to create your own variation. Build on the original, pivot in a new direction, or merge concepts to create something entirely new.'
  }
];

const AboutPage = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-8"
      >
        <div className="inline-block">
          <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-semibold uppercase tracking-wider">
            What is IdeaChain?
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 max-w-4xl mx-auto leading-tight">
          The collaborative platform where{' '}
          <span className="text-gradient">startup ideas evolve</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          IdeaChain is a fork-based innovation network powered by AI. Share concepts, get instant feedback, collaborate
          with creators worldwide, and watch ideas branch into entire ecosystems of innovation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            to="/create"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold shadow-xl shadow-primary-600/30 transition-all hover:shadow-primary-600/50 hover:scale-105"
          >
            Start Creating
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-full font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
          >
            Explore Ideas
          </Link>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="space-y-12">
        <SectionHeader
          eyebrow="The Process"
          title="How IdeaChain Works"
          description="From concept to community validation in four simple steps"
          align="center"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="text-5xl font-bold text-primary-600/20 dark:text-primary-400/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <SectionHeader
          eyebrow="Capabilities"
          title="Powerful Features Built for Innovators"
          description="Everything you need to validate, iterate, and evolve your startup ideas"
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="p-6 h-full hover:shadow-2xl dark:hover:shadow-primary-500/20 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why IdeaChain */}
      <section className="space-y-8">
        <SectionHeader
          eyebrow="The Vision"
          title="Why IdeaChain Exists"
          description="Breaking down the barriers between ideation and execution"
          align="center"
        />
        <Card className="p-8 md:p-12 max-w-4xl mx-auto">
          <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="text-lg">
              Most startup ideas die in isolation. Founders work in silos, unsure if their concept has merit, unable to
              get honest feedback until they've already invested months of effort.
            </p>
            <p className="text-lg">
              <strong className="text-slate-900 dark:text-slate-50">IdeaChain changes that.</strong> We believe
              innovation thrives in networks, not vacuums. By treating ideas like open-source code—forkable,
              remixable, and collaborative—we accelerate the journey from "what if?" to validated concept.
            </p>
            <p className="text-lg">
              Whether you're a solo founder seeking validation, a designer looking for technical co-founders, or an
              investor scouting emerging trends, IdeaChain gives you the tools to discover, refine, and evolve ideas
              faster than ever before.
            </p>
            <div className="pt-6 border-t border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                "The best way to have a great idea is to have lots of ideas, and the best way to refine an idea is to
                expose it to the world." — Inspired by Linus Pauling & the open-source movement
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 py-16 px-6 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-900 text-white shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Ready to evolve your ideas?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Join thousands of innovators building the next generation of startups, one fork at a time.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-primary-700 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Create Free Account
          </Link>
          <Link
            to="/explore"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            Browse Ideas
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
