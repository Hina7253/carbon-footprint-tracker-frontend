import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Compare from './pages/Compare';
import Leaderboard from './pages/Leaderboard';
import Suggestions from './pages/Suggestions';
import Chat from './pages/Chat';
import Trends from './pages/Trends';
import Badge from './pages/Badge';
import Report from './pages/Report';
import History from './pages/History';


function App() {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    // Initialize dark mode on app load
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/report" element={<Report />} />
          <Route path="/history" element={<History />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
