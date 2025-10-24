import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import IdeaDetailPage from './pages/IdeaDetailPage.jsx';
import CreateIdeaPage from './pages/CreateIdeaPage.jsx';
import AITrendsPage from './pages/AITrendsPage.jsx';
import MyIdeasPage from './pages/MyIdeasPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex gap-8">
          <Sidebar />
          <main className="flex-1 py-10">
            <Routes>
              <Route path="/" element={<AboutPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/idea/:id" element={<IdeaDetailPage />} />
              <Route path="/ai-trends" element={<AITrendsPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create" element={<CreateIdeaPage />} />
                <Route path="/my-ideas" element={<MyIdeasPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
