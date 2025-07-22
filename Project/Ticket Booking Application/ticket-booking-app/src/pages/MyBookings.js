import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  Event as EventIcon,
  ConfirmationNumber as TicketIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const MyBookings = () => {
  const { user } = useAuth();
  const { bookings, events } = useBooking();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userBookings, setUserBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const userBookingsData = bookings.filter(booking => booking.userId === user.id);
    setUserBookings(userBookingsData);
  }, [bookings, user.id]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckIcon />;
      case 'Today':
        return <ScheduleIcon />;
      case 'Upcoming':
        return <EventIcon />;
      default:
        return <EventIcon />;
    }
  };

  const filteredBookings = userBookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return getBookingStatus(booking) === filterStatus;
  });

  const getTotalSpent = () => {
    return userBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          My Bookings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all your event bookings
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TicketIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {userBookings.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {userBookings.filter(b => getBookingStatus(b) === 'Upcoming').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming Events
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {userBookings.filter(b => getBookingStatus(b) === 'Completed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed Events
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    ${getTotalSpent().toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filter by Status:
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Bookings</MenuItem>
              <MenuItem value="Upcoming">Upcoming</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Bookings List */}
      <Card>
        <CardContent>
          {filteredBookings.length > 0 ? (
            <List>
              {filteredBookings.map((booking) => {
                const event = getEventById(booking.eventId);
                const status = getBookingStatus(booking);
                
                return (
                  <ListItem
                    key={booking.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 3,
                      '&:last-child': { mb: 0 },
                      p: 3
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {getStatusIcon(status)}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {event?.title || 'Event not found'}
                          </Typography>
                          <Chip
                            label={status}
                            color={getStatusColor(status)}
                            icon={getStatusIcon(status)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {event && format(new Date(event.date), 'EEEE, MMMM dd, yyyy')} at {event.time}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {event?.venue}
                                </Typography>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TicketIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {booking.quantity} ticket(s) • ${booking.totalAmount}
                                </Typography>
                              </Box>
                              
                              <Typography variant="caption" color="text.secondary">
                                Booking #: {booking.bookingNumber}
                              </Typography>
                            </Grid>
                          </Grid>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Booked on {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Chip
                                label="Confirmed"
                                size="small"
                                color="success"
                                icon={<CheckIcon />}
                              />
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {filterStatus === 'all' ? 'No bookings found' : `No ${filterStatus.toLowerCase()} bookings`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filterStatus === 'all' 
                  ? 'Start exploring events and make your first booking'
                  : `You don't have any ${filterStatus.toLowerCase()} events`
                }
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyBookings; 