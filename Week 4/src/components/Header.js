import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User,
  Settings,
  LogOut
} from 'lucide-react';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, message: 'New user registration', time: '2 min ago', unread: true },
    { id: 2, message: 'System update completed', time: '1 hour ago', unread: true },
    { id: 3, message: 'Backup process finished', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="notifications">
          <button className="notification-btn">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button className="mark-all-read">Mark all read</button>
            </div>
            <div className="notification-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.unread ? 'unread' : ''}`}
                >
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {notification.unread && <div className="unread-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile">
          <button 
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">
              <User size={20} />
            </div>
            <span className="profile-name">Admin User</span>
          </button>
          
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <div className="profile-avatar-large">
                  <User size={24} />
                </div>
                <div>
                  <h4>Admin User</h4>
                  <p>admin@example.com</p>
                </div>
              </div>
              <div className="profile-actions">
                <button className="profile-action">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="profile-action">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="profile-action">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 