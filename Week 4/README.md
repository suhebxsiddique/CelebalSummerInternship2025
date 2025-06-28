# React Admin Dashboard

A beautiful and fully functional React Admin Dashboard with customizable themes, interactive tables, charts, calendar, and Kanban board. Built with modern React practices and beautiful UI/UX design.

## 🌟 Features

### 🎨 **Customizable Themes**
- Light and Dark theme support
- CSS variables for easy customization
- Smooth theme transitions
- Persistent theme preference

### 📊 **Interactive Dashboard**
- Real-time statistics cards
- Multiple chart types (Area, Bar, Line, Pie, Radar)
- Recent activity feed
- Responsive grid layout

### 📋 **Data Tables**
- Sortable and filterable columns
- Search functionality
- Pagination
- Action buttons (View, Edit, Delete)
- Status and role badges
- Responsive design

### 📈 **Analytics & Charts**
- Multiple chart types using Recharts
- Interactive tooltips
- Customizable colors and themes
- Export functionality
- Period selection (Week, Month, Quarter, Year)

### 📅 **Calendar**
- Full-featured calendar using react-big-calendar
- Multiple views (Month, Week, Day, Agenda)
- Event management (Add, Edit, Delete)
- Event details modal
- Upcoming events sidebar
- Drag and drop event creation

### 📋 **Kanban Board**
- Drag and drop task management
- Multiple columns (To Do, In Progress, Review, Done)
- Task cards with priority indicators
- Due date tracking
- Comments and attachments
- Task statistics

### 🎯 **Additional Features**
- Responsive design for all screen sizes
- Smooth animations and transitions
- Modern UI with beautiful gradients
- Interactive notifications
- User profile management
- Search functionality throughout the app

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📦 Dependencies

### Core Dependencies
- **React 18.2.0** - UI library
- **React Router DOM 6.3.0** - Client-side routing
- **Recharts 2.1.12** - Chart components
- **React Big Calendar 1.8.2** - Calendar component
- **Date-fns 2.29.3** - Date utility library
- **Lucide React 0.263.1** - Icon library
- **Framer Motion 7.6.7** - Animation library

### Development Dependencies
- **React Scripts 5.0.1** - Build tools
- **Testing libraries** - Jest and React Testing Library

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Top navigation header
│   ├── Header.css
│   ├── Sidebar.js      # Navigation sidebar
│   └── Sidebar.css
├── contexts/           # React contexts
│   └── ThemeContext.js # Theme management
├── pages/              # Main page components
│   ├── Dashboard.js    # Main dashboard
│   ├── Dashboard.css
│   ├── Tables.js       # Data tables
│   ├── Tables.css
│   ├── Charts.js       # Analytics charts
│   ├── Charts.css
│   ├── Calendar.js     # Calendar view
│   ├── Calendar.css
│   ├── Kanban.js       # Kanban board
│   └── Kanban.css
├── App.js              # Main app component
├── App.css             # App styles
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Theme Customization
The application uses CSS variables for theming. You can customize colors by modifying the variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f8fafc;
  --accent-color: #06b6d4;
  /* ... more variables */
}
```

### Adding New Pages
1. Create a new component in the `src/pages/` directory
2. Add the route in `src/App.js`
3. Add navigation item in `src/components/Sidebar.js`

### Styling
- Uses CSS modules and custom properties
- Responsive design with mobile-first approach
- Consistent design system with reusable components

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is developed as part of Celebal Week 4 Task.

## 👨‍💻 Developer

**Developed by:** Mohd Suheb Siddique

---

## 🎯 Key Features Summary

✅ **Modern React Architecture** - Built with React 18 and modern hooks  
✅ **Beautiful UI/UX** - Clean, modern design with smooth animations  
✅ **Theme Support** - Light/Dark mode with persistent preferences  
✅ **Interactive Charts** - Multiple chart types with real-time data  
✅ **Data Tables** - Sortable, filterable, and paginated tables  
✅ **Calendar** - Full-featured calendar with event management  
✅ **Kanban Board** - Drag and drop task management  
✅ **Responsive Design** - Works perfectly on all devices  
✅ **Performance Optimized** - Fast loading and smooth interactions  
✅ **Accessibility** - WCAG compliant design patterns  

---

**Celebal Week 4 Task** - A comprehensive React Admin Dashboard showcasing modern web development practices and beautiful user interface design. 