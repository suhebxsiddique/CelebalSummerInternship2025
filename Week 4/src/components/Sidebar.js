import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Calendar, 
  Trello,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tables', icon: Table, label: 'Tables' },
    { path: '/charts', icon: BarChart3, label: 'Charts' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/kanban', icon: Trello, label: 'Kanban' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <LayoutDashboard size={24} />
            </div>
            <h2>Admin Panel</h2>
          </div>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 