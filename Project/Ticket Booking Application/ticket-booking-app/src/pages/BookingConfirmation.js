import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Event as EventIcon,
  ConfirmationNumber as TicketIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user } = useAuth();
  const { bookings, events } = useBooking();
  
  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const bookingData = bookings.find(b => b.id === parseInt(bookingId));
    if (bookingData) {
      setBooking(bookingData);
      const eventData = events.find(e => e.id === bookingData.eventId);
      setEvent(eventData);
    } else {
      navigate('/dashboard');
    }
  }, [bookingId, bookings, events, navigate]);

  if (!booking || !event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const handleDownloadTicket = () => {
    // In a real application, this would generate and download a PDF ticket
    alert('Ticket download feature would be implemented here');
  };

  const handleShareBooking = () => {
    // In a real application, this would share booking details
    if (navigator.share) {
      navigator.share({
        title: `My booking for ${event.title}`,
        text: `I just booked tickets for ${event.title} on ${format(new Date(event.date), 'MMM dd, yyyy')}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <CheckIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your tickets have been successfully booked
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Booking Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Booking Details
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Event"
                    secondary={event.title}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <TimeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date & Time"
                    secondary={`${format(new Date(event.date), 'EEEE, MMMM dd, yyyy')} at ${event.time}`}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Venue"
                    secondary={event.venue}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Booked By"
                    secondary={user.name}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <TicketIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tickets"
                    secondary={`${booking.quantity} ticket(s)`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Event Information */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Event Information
              </Typography>
              
              <Typography variant="body1" paragraph>
                {event.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label={event.category} color="primary" />
                <Chip label={`$${event.price} per ticket`} variant="outlined" />
                <Chip label={`${event.availableSeats} seats available`} variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Booking Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tickets ({booking.quantity})
                  </Typography>
                  <Typography variant="body2">
                    ${event.price} each
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    ${booking.totalAmount}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Booking Reference
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                  {booking.bookingNumber}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Booking Date
                </Typography>
                <Typography variant="body1">
                  {format(new Date(booking.bookingDate), 'MMM dd, yyyy HH:mm')}
                </Typography>
              </Box>
              
              <Chip
                label="Confirmed"
                color="success"
                icon={<CheckIcon />}
                sx={{ mb: 3, width: '100%', py: 1 }}
              />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadTicket}
                  fullWidth
                >
                  Download Ticket
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShareBooking}
                  fullWidth
                >
                  Share Booking
                </Button>
                
                <Button
                  variant="outlined"
                  component={Link}
                  to="/dashboard"
                  startIcon={<HomeIcon />}
                  fullWidth
                >
                  Go to Dashboard
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Important Information */}
      <Paper sx={{ p: 4, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Important Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Before the Event:
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Arrive at least 30 minutes before the event starts"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Bring a valid ID and your booking confirmation"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Check the venue's COVID-19 policies if applicable"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Need Help?
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Contact support: support@tickethub.com"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Call us: +1 (555) 123-4567"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  primary="• Visit our help center for FAQs"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation; 