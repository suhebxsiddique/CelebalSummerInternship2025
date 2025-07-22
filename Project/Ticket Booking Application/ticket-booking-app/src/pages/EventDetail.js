import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  IconButton,
  Avatar,
  Badge,
  Stepper,
  Step,
  StepLabel,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Event as EventIcon,
  People as PeopleIcon,
  ConfirmationNumber as TicketIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  TrendingUp as TrendingIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, isAuthenticated } = useAuth();
  const { getEventById, createBooking } = useBooking();
  
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const eventData = getEventById(id);
    if (eventData) {
      setEvent(eventData);
    } else {
      navigate('/events');
    }
  }, [id, getEventById, navigate]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (quantity > event.availableSeats) {
      setBookingError('Not enough seats available');
      return;
    }

    setIsBooking(true);
    setBookingError('');

    try {
      const bookingData = {
        eventId: event.id,
        userId: user.id,
        quantity: quantity,
        totalAmount: event.price * quantity,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue
      };

      const result = await createBooking(bookingData);
      
      if (result.success) {
        setBookingDialogOpen(false);
        navigate(`/booking-confirmation/${result.booking.id}`);
      } else {
        setBookingError(result.error || 'Booking failed');
      }
    } catch (error) {
      setBookingError('An error occurred while booking');
    } finally {
      setIsBooking(false);
    }
  };

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Typography variant="h6" color="text.secondary">Loading event details...</Typography>
        </Box>
      </Container>
    );
  }

  const totalPrice = event.price * quantity;
  const isSoldOut = event.availableSeats === 0;
  const isLowStock = event.availableSeats <= 10 && event.availableSeats > 0;

  const steps = ['Select Tickets', 'Review & Pay', 'Confirmation'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
          Home
        </MuiLink>
        <MuiLink component={Link} to="/events" color="inherit" sx={{ textDecoration: 'none' }}>
          Events
        </MuiLink>
        <Typography color="text.primary">{event.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Event Image */}
        <Grid item xs={12} md={7}>
          <Box sx={{ position: 'relative' }}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="500"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' },
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Box>
              {event.trending && (
                <Chip
                  icon={<TrendingIcon />}
                  label="Trending"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
            </Card>
          </Box>
        </Grid>

        {/* Event Details */}
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label={event.category}
                color="primary"
                sx={{ mr: 2, fontWeight: 600 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ fontSize: 20, color: '#ffa502', mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {event.rating || '4.5'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  ({event.reviews || 128} reviews)
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {event.title}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.6, mb: 3 }}>
              {event.description}
            </Typography>
          </Box>

          {/* Event Info */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Venue"
                  secondary={event.venue}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <CalendarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Date & Time"
                  secondary={`${format(new Date(event.date), 'EEEE, MMMM dd, yyyy')} at ${event.time}`}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Available Seats"
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        {event.availableSeats} of {event.capacity} seats available
                      </Typography>
                      {isLowStock && (
                        <Chip label="Low Stock" size="small" color="warning" />
                      )}
                    </Box>
                  }
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon>
                  <TicketIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Price"
                  secondary={`₹${event.price} per ticket`}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Booking Section */}
          <Card sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Book Tickets
            </Typography>
            
            {isSoldOut ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  This event is sold out
                </Typography>
                <Typography variant="body2">
                  Check back later for cancellations or similar events
                </Typography>
              </Alert>
            ) : (
              <>
                {isLowStock && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Only {event.availableSeats} seats left!
                    </Typography>
                  </Alert>
                )}
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Number of Tickets
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      {[...Array(Math.min(10, event.availableSeats))].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Price per ticket
                    </Typography>
                    <Typography variant="body2">
                      ₹{event.price}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Quantity
                    </Typography>
                    <Typography variant="body2">
                      {quantity}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Total Amount
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      ₹{totalPrice}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setBookingDialogOpen(true)}
                  disabled={isSoldOut}
                  sx={{ 
                    py: 1.5, 
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                  }}
                >
                  Book Now
                </Button>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                  Secure booking with instant confirmation
                </Typography>
              </>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Event Details Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Event Details
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                About This Event
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                {event.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
                Event Highlights
              </Typography>
              <List>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Professional sound and lighting setup" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Comfortable seating arrangements" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Refreshments available" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Parking facilities" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body2">
                  +91 98765 43210
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body2">
                  support@eventhub.com
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body2">
                  www.eventhub.com
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Booking Confirmation Dialog */}
      <Dialog
        open={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Confirm Your Booking
          </Typography>
        </DialogTitle>
        <DialogContent>
          {bookingError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {bookingError}
            </Alert>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')} at {event.time}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {event.venue}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Quantity:</Typography>
            <Typography variant="body2">{quantity}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Price per ticket:</Typography>
            <Typography variant="body2">₹{event.price}</Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total Amount:
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              ₹{totalPrice}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setBookingDialogOpen(false)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            variant="contained"
            disabled={isBooking}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 600,
              px: 3,
            }}
          >
            {isBooking ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetail; 