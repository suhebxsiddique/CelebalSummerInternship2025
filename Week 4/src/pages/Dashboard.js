import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'var(--primary-color)'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'var(--success-color)'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative',
      icon: ShoppingCart,
      color: 'var(--warning-color)'
    },
    {
      title: 'Growth',
      value: '23.4%',
      change: '+5.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'var(--accent-color)'
    }
  ];

  const chartData = [
    { name: 'Jan', users: 400, revenue: 2400, orders: 240 },
    { name: 'Feb', users: 300, revenue: 1398, orders: 221 },
    { name: 'Mar', users: 200, revenue: 9800, orders: 290 },
    { name: 'Apr', users: 278, revenue: 3908, orders: 200 },
    { name: 'May', users: 189, revenue: 4800, orders: 218 },
    { name: 'Jun', users: 239, revenue: 3800, orders: 250 },
    { name: 'Jul', users: 349, revenue: 4300, orders: 210 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#6366f1' },
    { name: 'Mobile', value: 300, color: '#06b6d4' },
    { name: 'Tablet', value: 200, color: '#10b981' },
    { name: 'Other', value: 100, color: '#f59e0b' },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'placed an order', time: '2 minutes ago', type: 'order' },
    { id: 2, user: 'Jane Smith', action: 'registered', time: '5 minutes ago', type: 'user' },
    { id: 3, user: 'Mike Johnson', action: 'completed payment', time: '10 minutes ago', type: 'payment' },
    { id: 4, user: 'Sarah Wilson', action: 'left a review', time: '15 minutes ago', type: 'review' },
    { id: 5, user: 'Tom Brown', action: 'updated profile', time: '20 minutes ago', type: 'profile' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card card">
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-change">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight size={16} className="positive" />
                  ) : (
                    <ArrowDownRight size={16} className="negative" />
                  )}
                  <span className={stat.changeType}>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card card">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--primary-color)' }}></span>
                Revenue
              </span>
              <span className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--accent-color)' }}></span>
                Users
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1" 
                stroke="var(--primary-color)" 
                fill="var(--primary-color)" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="2" 
                stroke="var(--accent-color)" 
                fill="var(--accent-color)" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card card">
          <div className="chart-header">
            <h3>Orders Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              />
              <Bar dataKey="orders" fill="var(--warning-color)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="chart-card card">
          <div className="chart-header">
            <h3>Traffic Sources</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="activity-card card">
          <div className="activity-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-secondary">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <Activity size={16} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; 2024 Celebal Week 4 Task. Developed by <strong>Mohd Suheb Siddique</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard; 