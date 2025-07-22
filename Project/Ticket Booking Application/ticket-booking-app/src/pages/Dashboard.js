import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Person as PersonIcon,
  Event as EventIcon,
  ConfirmationNumber as TicketIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const { bookings, events } = useBooking();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userBookings, setUserBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Get user's bookings
    const userBookingsData = bookings.filter(booking => booking.userId === user.id);
    setUserBookings(userBookingsData);

    // Get upcoming events (events with dates in the future)
    const today = new Date();
    const upcoming = events.filter(event => new Date(event.date) > today);
    setUpcomingEvents(upcoming.slice(0, 3)); // Show only 3 upcoming events
  }, [bookings, events, user.id]);

  const getEventById = (eventId) => {
    return events.find(event => event.id === eventId);
  };

  const getBookingStatus = (booking) => {
    const event = getEventById(booking.eventId);
    if (!event) return 'Unknown';
    
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (eventDate < today) {
      return 'Completed';
    } else if (eventDate.getTime() - today.getTime() < 24 * 60 * 60 * 1000) {
      return 'Today';
    } else {
      return 'Upcoming';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Today':
        return 'warning';
      case 'Upcoming':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome back, {user.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your bookings and upcoming events
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mr: 2
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Chip
                    label={user.role === 'admin' ? 'Administrator' : 'User'}
                    size="small"
                    color={user.role === 'admin' ? 'secondary' : 'primary'}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <TicketIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Total Bookings"
                    secondary={userBookings.length}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <EventIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Upcoming Events"
                    secondary={userBookings.filter(b => getBookingStatus(b) === 'Upcoming').length}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Bookings
                </Typography>
                <Button
                  component={Link}
                  to="/my-bookings"
                  variant="outlined"
                  size="small"
                >
                  View All
                </Button>
              </Box>
              
              {userBookings.length > 0 ? (
                <List>
                  {userBookings.slice(0, 5).map((booking) => {
                    const event = getEventById(booking.eventId);
                    const status = getBookingStatus(booking);
                    
                    return (
                      <ListItem
                        key={booking.id}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 2,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {event?.title || 'Event not found'}
                              </Typography>
                              <Chip
                                label={status}
                                size="small"
                                color={getStatusColor(status)}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {event && format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {event?.venue} • {booking.quantity} ticket(s) • ${booking.totalAmount}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Booking #: {booking.bookingNumber}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <EventIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No bookings yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Start exploring events and make your first booking
                  </Typography>
                  <Button
                    component={Link}
                    to="/events"
                    variant="contained"
                  >
                    Browse Events
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upcoming Events
                </Typography>
                <Button
                  component={Link}
                  to="/events"
                  variant="outlined"
                  size="small"
                >
                  View All Events
                </Button>
              </Box>
              
              {upcomingEvents.length > 0 ? (
                <Grid container spacing={3}>
                  {upcomingEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                      <Paper
                        sx={{
                          p: 2,
                          height: '100%',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Chip
                            label={event.category}
                            size="small"
                            color="primary"
                          />
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                            ${event.price}
                          </Typography>
                        </Box>
                        
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {event.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.venue}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <TimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                          </Typography>
                        </Box>
                        
                        <Button
                          component={Link}
                          to={`/events/${event.id}`}
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          View Details
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ScheduleIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No upcoming events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check back later for new events
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 