import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Tables.css';

const Tables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [itemsPerPage] = useState(10);

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', actions: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', actions: '' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10', actions: '' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13', actions: '' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-12', actions: '' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-08', actions: '' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-11', actions: '' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-09', actions: '' },
    { id: 9, name: 'Robert Taylor', email: 'robert@example.com', role: 'Admin', status: 'Inactive', lastLogin: '2024-01-07', actions: '' },
    { id: 10, name: 'Amanda White', email: 'amanda@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-06', actions: '' },
    { id: 11, name: 'James Wilson', email: 'james@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-05', actions: '' },
    { id: 12, name: 'Jennifer Lee', email: 'jennifer@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-04', actions: '' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  // Filter and sort data
  const filteredData = tableData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge ${status.toLowerCase()}`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      'Admin': 'var(--error-color)',
      'Editor': 'var(--warning-color)',
      'User': 'var(--success-color)'
    };
    
    return (
      <span 
        className="role-badge"
        style={{ backgroundColor: roleColors[role] + '20', color: roleColors[role] }}
      >
        {role}
      </span>
    );
  };

  return (
    <div className="tables-page">
      <div className="tables-header">
        <div>
          <h1>Data Tables</h1>
          <p>Manage and view your data in organized tables with advanced filtering and sorting.</p>
        </div>
        <button className="btn btn-primary">
          Add New User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="table-controls card">
        <div className="controls-left">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            Filter
          </button>
        </div>
        <div className="controls-right">
          <span className="results-count">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedData.length)} of {sortedData.length} results
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-container card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className={column.sortable ? 'sortable' : ''}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="th-content">
                      {column.label}
                      {column.sortable && (
                        <div className="sort-icons">
                          <ChevronUp 
                            size={16} 
                            className={sortField === column.key && sortDirection === 'asc' ? 'active' : ''}
                          />
                          <ChevronDown 
                            size={16} 
                            className={sortField === column.key && sortDirection === 'desc' ? 'active' : ''}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {row.name.charAt(0)}
                      </div>
                      <span className="user-name">{row.name}</span>
                    </div>
                  </td>
                  <td>{row.email}</td>
                  <td>{getRoleBadge(row.role)}</td>
                  <td>{getStatusBadge(row.status)}</td>
                  <td>{row.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="action-btn" title="More">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="tables-footer">
        <div className="footer-content">
          <p>&copy; 2024 Celebal Week 4 Task. Developed by <strong>Mohd Suheb Siddique</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Tables; 