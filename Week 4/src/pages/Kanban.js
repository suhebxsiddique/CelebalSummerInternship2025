import React, { useState } from 'react';
import { 
  Trello, 
  Plus, 
  MoreVertical, 
  User,
  Clock,
  Tag,
  MessageSquare,
  Paperclip,
  CheckCircle,
  Circle,
  AlertCircle
} from 'lucide-react';
import './Kanban.css';

const Kanban = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      color: '#6366f1',
      tasks: [
        {
          id: 1,
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new landing page design',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-01-25',
          tags: ['Design', 'Frontend'],
          comments: 3,
          attachments: 2,
          status: 'todo'
        },
        {
          id: 2,
          title: 'Update API documentation',
          description: 'Review and update the API documentation for version 2.0',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2024-01-28',
          tags: ['Backend', 'Documentation'],
          comments: 1,
          attachments: 0,
          status: 'todo'
        }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      color: '#f59e0b',
      tasks: [
        {
          id: 3,
          title: 'Implement user authentication',
          description: 'Build JWT-based authentication system with refresh tokens',
          priority: 'high',
          assignee: 'Mike Johnson',
          dueDate: '2024-01-22',
          tags: ['Backend', 'Security'],
          comments: 5,
          attachments: 1,
          status: 'inProgress'
        },
        {
          id: 4,
          title: 'Create database schema',
          description: 'Design and implement the new database schema for the project',
          priority: 'medium',
          assignee: 'Sarah Wilson',
          dueDate: '2024-01-24',
          tags: ['Database', 'Backend'],
          comments: 2,
          attachments: 3,
          status: 'inProgress'
        }
      ]
    },
    review: {
      id: 'review',
      title: 'Review',
      color: '#06b6d4',
      tasks: [
        {
          id: 5,
          title: 'Code review for payment module',
          description: 'Review the payment integration code and ensure security standards',
          priority: 'high',
          assignee: 'Tom Brown',
          dueDate: '2024-01-20',
          tags: ['Code Review', 'Security'],
          comments: 8,
          attachments: 4,
          status: 'review'
        }
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      color: '#10b981',
      tasks: [
        {
          id: 6,
          title: 'Setup development environment',
          description: 'Configure development environment with all necessary tools',
          priority: 'low',
          assignee: 'Emily Davis',
          dueDate: '2024-01-15',
          tags: ['Setup', 'DevOps'],
          comments: 1,
          attachments: 0,
          status: 'done'
        },
        {
          id: 7,
          title: 'Create project structure',
          description: 'Set up the initial project structure and folder organization',
          priority: 'medium',
          assignee: 'David Miller',
          dueDate: '2024-01-18',
          tags: ['Setup', 'Architecture'],
          comments: 2,
          attachments: 1,
          status: 'done'
        }
      ]
    }
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== columnId) {
      const updatedColumns = { ...columns };
      
      // Remove from original column
      Object.keys(updatedColumns).forEach(key => {
        updatedColumns[key].tasks = updatedColumns[key].tasks.filter(
          task => task.id !== draggedTask.id
        );
      });
      
      // Add to new column
      const updatedTask = { ...draggedTask, status: columnId };
      updatedColumns[columnId].tasks.push(updatedTask);
      
      setColumns(updatedColumns);
    }
    setDraggedTask(null);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="priority-high" />;
      case 'medium':
        return <Circle size={16} className="priority-medium" />;
      case 'low':
        return <CheckCircle size={16} className="priority-low" />;
      default:
        return <Circle size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--error-color)';
      case 'medium':
        return 'var(--warning-color)';
      case 'low':
        return 'var(--success-color)';
      default:
        return 'var(--text-muted)';
    }
  };

  const formatDueDate = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: 'var(--error-color)' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'var(--warning-color)' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'var(--warning-color)' };
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays} days`, color: 'var(--warning-color)' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'var(--text-muted)' };
    }
  };

  return (
    <div className="kanban-page">
      <div className="kanban-header">
        <div>
          <h1>Kanban Board</h1>
          <p>Manage your projects and tasks with our interactive Kanban board.</p>
        </div>
        <div className="kanban-controls">
          <button className="btn btn-secondary">
            <Trello size={16} />
            Export Board
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <div 
                  className="column-color" 
                  style={{ backgroundColor: column.color }}
                ></div>
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <button className="add-task-btn">
                <Plus size={16} />
              </button>
            </div>
            
            <div 
              className="column-content"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="task-header">
                    <div className="task-priority">
                      {getPriorityIcon(task.priority)}
                    </div>
                    <button className="task-menu">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                  </div>
                  
                  <div className="task-tags">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="task-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="task-footer">
                    <div className="task-assignee">
                      <div className="assignee-avatar">
                        <User size={12} />
                      </div>
                      <span>{task.assignee}</span>
                    </div>
                    
                    <div className="task-meta">
                      <div className="due-date" style={{ color: formatDueDate(task.dueDate).color }}>
                        <Clock size={12} />
                        <span>{formatDueDate(task.dueDate).text}</span>
                      </div>
                      
                      {task.comments > 0 && (
                        <div className="task-comments">
                          <MessageSquare size={12} />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      
                      {task.attachments > 0 && (
                        <div className="task-attachments">
                          <Paperclip size={12} />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {column.tasks.length === 0 && (
                <div className="empty-column">
                  <p>No tasks in this column</p>
                  <button className="btn btn-secondary">
                    <Plus size={16} />
                    Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Board Stats */}
      <div className="board-stats">
        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Trello size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Tasks</h4>
            <p className="stat-value">
              {Object.values(columns).reduce((total, column) => total + column.tasks.length, 0)}
            </p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--warning-color)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h4>In Progress</h4>
            <p className="stat-value">{columns.inProgress.tasks.length}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-color)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h4>High Priority</h4>
            <p className="stat-value">
              {Object.values(columns).reduce((total, column) => 
                total + column.tasks.filter(task => task.priority === 'high').length, 0
              )}
            </p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--success-color)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h4>Completed</h4>
            <p className="stat-value">{columns.done.tasks.length}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="kanban-footer">
        <div className="footer-content">
          <p>&copy; 2024 Celebal Week 4 Task. Developed by <strong>Mohd Suheb Siddique</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Kanban; 