import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Download,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts';
import './Charts.css';

const Charts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const salesData = [
    { month: 'Jan', sales: 4000, profit: 2400, orders: 240, customers: 180 },
    { month: 'Feb', sales: 3000, profit: 1398, orders: 221, customers: 150 },
    { month: 'Mar', sales: 2000, profit: 9800, orders: 290, customers: 200 },
    { month: 'Apr', sales: 2780, profit: 3908, orders: 200, customers: 170 },
    { month: 'May', sales: 1890, profit: 4800, orders: 218, customers: 190 },
    { month: 'Jun', sales: 2390, profit: 3800, orders: 250, customers: 220 },
    { month: 'Jul', sales: 3490, profit: 4300, orders: 210, customers: 180 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#6366f1' },
    { name: 'Mobile', value: 300, color: '#06b6d4' },
    { name: 'Tablet', value: 200, color: '#10b981' },
    { name: 'Other', value: 100, color: '#f59e0b' },
  ];

  const radarData = [
    { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
    { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
    { subject: 'Development', A: 86, B: 130, fullMark: 150 },
    { subject: 'Customer Support', A: 99, B: 100, fullMark: 150 },
    { subject: 'Finance', A: 85, B: 90, fullMark: 150 },
    { subject: 'Operations', A: 65, B: 85, fullMark: 150 },
  ];

  const performanceData = [
    { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
    { month: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
    { month: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
    { month: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
    { month: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
  ];

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} :`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-page">
      <div className="charts-header">
        <div>
          <h1>Analytics & Charts</h1>
          <p>Visualize your data with interactive charts and analytics.</p>
        </div>
        <div className="header-controls">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-grid">
        {/* Sales Overview */}
        <div className="chart-card card">
          <div className="chart-header">
            <div className="chart-title">
              <BarChart3 size={20} />
              <h3>Sales Overview</h3>
            </div>
            <button className="btn btn-secondary">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                fill="var(--primary-color)" 
                fillOpacity={0.3}
                stroke="var(--primary-color)"
              />
              <Bar dataKey="orders" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="chart-card card">
          <div className="chart-header">
            <div className="chart-title">
              <TrendingUp size={20} />
              <h3>Revenue Trend</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="var(--primary-color)" 
                strokeWidth={3}
                dot={{ fill: 'var(--primary-color)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--primary-color)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="var(--success-color)" 
                strokeWidth={3}
                dot={{ fill: 'var(--success-color)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--success-color)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="chart-card card">
          <div className="chart-header">
            <div className="chart-title">
              <PieChart size={20} />
              <h3>Traffic Sources</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
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
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="chart-card card">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} />
              <h3>Performance Metrics</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" />
              <PolarRadiusAxis stroke="var(--text-secondary)" />
              <Radar
                name="Current"
                dataKey="A"
                stroke="var(--primary-color)"
                fill="var(--primary-color)"
                fillOpacity={0.3}
              />
              <Radar
                name="Target"
                dataKey="B"
                stroke="var(--accent-color)"
                fill="var(--accent-color)"
                fillOpacity={0.3}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="bottom-charts">
        {/* Financial Performance */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3>Financial Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="var(--success-color)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="var(--error-color)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3>Customer Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="customers" 
                stackId="1" 
                stroke="var(--warning-color)" 
                fill="var(--warning-color)" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-overview">
        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--primary-color)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Revenue</h4>
            <p className="stat-value">$45,678</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--success-color)' }}>
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Orders</h4>
            <p className="stat-value">1,234</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-color)' }}>
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h4>Conversion Rate</h4>
            <p className="stat-value">23.4%</p>
            <span className="stat-change positive">+5.7%</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--warning-color)' }}>
            <PieChart size={24} />
          </div>
          <div className="stat-content">
            <h4>Avg. Order Value</h4>
            <p className="stat-value">$89.50</p>
            <span className="stat-change negative">-2.1%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="charts-footer">
        <div className="footer-content">
          <p>&copy; 2024 Celebal Week 4 Task. Developed by <strong>Mohd Suheb Siddique</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Charts; 