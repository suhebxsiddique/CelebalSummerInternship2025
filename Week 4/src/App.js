import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Charts from './pages/Charts';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="main-content">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 