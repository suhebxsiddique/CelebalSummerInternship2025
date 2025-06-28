import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { 
  Calendar, 
  Plus, 
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      description: 'Weekly team sync meeting',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      type: 'meeting',
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Client Presentation',
      start: new Date(2024, 0, 16, 14, 0),
      end: new Date(2024, 0, 16, 15, 30),
      description: 'Present quarterly results to client',
      location: 'Virtual Meeting',
      attendees: ['Sarah Wilson', 'Tom Brown'],
      type: 'presentation',
      color: '#06b6d4'
    },
    {
      id: 3,
      title: 'Project Deadline',
      start: new Date(2024, 0, 18, 17, 0),
      end: new Date(2024, 0, 18, 17, 0),
      description: 'Submit final project deliverables',
      location: 'Office',
      attendees: ['Development Team'],
      type: 'deadline',
      color: '#ef4444'
    },
    {
      id: 4,
      title: 'Training Session',
      start: new Date(2024, 0, 20, 9, 0),
      end: new Date(2024, 0, 20, 12, 0),
      description: 'New software training for team',
      location: 'Training Room B',
      attendees: ['All Staff'],
      type: 'training',
      color: '#10b981'
    },
    {
      id: 5,
      title: 'Lunch with Client',
      start: new Date(2024, 0, 22, 12, 0),
      end: new Date(2024, 0, 22, 13, 30),
      description: 'Business lunch discussion',
      location: 'Downtown Restaurant',
      attendees: ['Emily Davis', 'Client Rep'],
      type: 'meeting',
      color: '#f59e0b'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [view, setView] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '2px 5px'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleSelectSlot = (slotInfo) => {
    // Create new event
    const newEvent = {
      id: Date.now(),
      title: 'New Event',
      start: slotInfo.start,
      end: slotInfo.end,
      description: '',
      location: '',
      attendees: [],
      type: 'meeting',
      color: '#6366f1'
    };
    setSelectedEvent(newEvent);
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (eventData.id) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === eventData.id ? eventData : event
      ));
    } else {
      // Add new event
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <Users size={16} />;
      case 'presentation':
        return <Calendar size={16} />;
      case 'deadline':
        return <Clock size={16} />;
      case 'training':
        return <Users size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div>
          <h1>Calendar</h1>
          <p>Manage your schedule and events with our interactive calendar.</p>
        </div>
        <div className="calendar-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar View Controls */}
      <div className="calendar-view-controls card">
        <div className="view-buttons">
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`view-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button 
            className={`view-btn ${view === 'agenda' ? 'active' : ''}`}
            onClick={() => setView('agenda')}
          >
            Agenda
          </button>
        </div>
        <div className="calendar-info">
          <span className="events-count">
            {filteredEvents.length} events
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-container card">
        <BigCalendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          onView={setView}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          tooltipAccessor={(event) => `${event.title} - ${event.description}`}
          messages={{
            next: "Next",
            previous: "Previous",
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            agenda: "Agenda",
            noEventsInRange: "No events in this range."
          }}
        />
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events card">
        <div className="section-header">
          <h3>Upcoming Events</h3>
          <button className="btn btn-secondary">View All</button>
        </div>
        <div className="events-list">
          {filteredEvents
            .filter(event => event.start > new Date())
            .sort((a, b) => a.start - b.start)
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="event-item">
                <div className="event-time">
                  <Clock size={16} />
                  <span>{format(event.start, 'MMM dd, HH:mm')}</span>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className="event-location">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                    <span className="event-attendees">
                      <Users size={14} />
                      {event.attendees.length} attendees
                    </span>
                  </div>
                </div>
                <div className="event-actions">
                  <button className="action-btn" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="event-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Event Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowEventModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="event-details">
                <div className="event-header">
                  <div className="event-icon" style={{ backgroundColor: selectedEvent.color }}>
                    {getEventTypeIcon(selectedEvent.type)}
                  </div>
                  <div>
                    <h4>{selectedEvent.title}</h4>
                    <p className="event-time">
                      {format(selectedEvent.start, 'MMM dd, yyyy HH:mm')} - 
                      {format(selectedEvent.end, 'HH:mm')}
                    </p>
                  </div>
                </div>
                
                <div className="event-info">
                  <div className="info-item">
                    <MapPin size={16} />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="info-item">
                    <Users size={16} />
                    <span>{selectedEvent.attendees.join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>{selectedEvent.description}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowEventModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSaveEvent(selectedEvent)}
                >
                  Save Changes
                </button>
                {selectedEvent.id && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="calendar-footer">
        <div className="footer-content">
          <p>&copy; 2024 Celebal Week 4 Task. Developed by <strong>Mohd Suheb Siddique</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default CalendarPage; 