import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Rating,
  Avatar,
  IconButton,
  Paper
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  ArrowForward as ArrowIcon,
  Star as StarIcon,
  Movie as MovieIcon,
  SportsEsports as SportsIcon,
  MusicNote as MusicIcon,
  TheaterComedy as TheaterIcon,
  TrendingUp as TrendingIcon,
  PlayArrow as PlayIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const Home = () => {
  const { events } = useBooking();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState(0);

  const featuredEvents = events.slice(0, 6);
  const trendingEvents = events.slice(0, 4);
  
  // Filter Celebal Technologies events
  const celebalEvents = events.filter(event => 
    event.title.toLowerCase().includes('celebal technologies')
  );

  const categories = [
    { name: 'Movies', icon: <MovieIcon />, color: '#1976d2' },
    { name: 'Sports', icon: <SportsIcon />, color: '#2196f3' },
    { name: 'Music', icon: <MusicIcon />, color: '#42a5f5' },
    { name: 'Theater', icon: <TheaterIcon />, color: '#64b5f6' },
    { name: 'Comedy', icon: <TheaterIcon />, color: '#90caf9' },
    { name: 'Workshops', icon: <EventIcon />, color: '#bbdefb' },
  ];

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const EventCard = ({ event, variant = 'default' }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[12],
          '& .event-image': {
            transform: 'scale(1.05)',
          },
          '& .event-actions': {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={variant === 'trending' ? '280' : '200'}
          image={event.image}
          alt={event.title}
          className="event-image"
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />
        <Box
          className="event-actions"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
        {variant === 'trending' && (
          <Chip
            icon={<TrendingIcon />}
            label="Trending"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: '#1976d2',
              color: 'white',
              fontWeight: 600,
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip
            label={event.category}
            size="small"
            sx={{
              bgcolor: categories.find(cat => cat.name === event.category)?.color || 'primary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ fontSize: 16, color: '#1976d2', mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {event.rating || '4.5'}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant={variant === 'trending' ? 'h6' : 'subtitle1'} 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          paragraph
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {event.description}
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
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
            ₹{event.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.availableSeats} seats left
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to={`/events/${event.id}`}
          endIcon={<ArrowIcon />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            py: 1,
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      {/* Professional Top Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.98)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <EventIcon sx={{ fontSize: 32, color: '#1976d2' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                EventHub
              </Typography>
            </Box>

            {/* Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Button
                sx={{
                  color: '#333',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1976d2',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                Home
              </Button>
              <Button
                sx={{
                  color: '#333',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1976d2',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                Events
              </Button>
              <Button
                sx={{
                  color: '#333',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1976d2',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                Categories
              </Button>
              <Button
                sx={{
                  color: '#333',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: '#1976d2',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                About
              </Button>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#1565c0',
                    bgcolor: 'rgba(25, 118, 210, 0.04)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#1976d2',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    bgcolor: '#1565c0',
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          pt: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h1'}
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Book Your Perfect
                <Box component="span" sx={{ display: 'block', color: '#e3f2fd' }}>
                  Event Experience
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 4, 
                  opacity: 0.95, 
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Discover amazing events across India - from Bollywood concerts to IPL matches, 
                comedy shows to tech meetups. Secure your tickets with India's most trusted booking platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/events"
                  startIcon={<PlayIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: '#1976d2',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Events
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EventIcon
                    sx={{
                      fontSize: { xs: 200, md: 300 },
                      opacity: 0.3,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.05)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PlayIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 4, fontWeight: 700 }}
        >
          Browse by Category
        </Typography>
        
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              minWidth: 120,
              textTransform: 'none',
              fontWeight: 600,
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={category.name}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  {category.name}
                </Box>
              }
              sx={{
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: category.color,
                },
              }}
            />
          ))}
        </Tabs>
      </Container>

      {/* Celebal Technologies Events Section */}
      {celebalEvents.length > 0 && (
        <Box sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'fadeInUp 0.8s ease-out',
                  '@keyframes fadeInUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                Celebal Technologies Events
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.9, 
                  mb: 4,
                  animation: 'fadeInUp 0.8s ease-out 0.2s both',
                }}
              >
                Join us for exclusive tech events, workshops, and career opportunities
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {celebalEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: 'white',
                      color: '#333',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes slideInUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(50px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                        '& .event-image': {
                          transform: 'scale(1.08)',
                        },
                        '& .card-overlay': {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={event.image}
                        alt={event.title}
                        className="event-image"
                        sx={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      <Box
                        className="card-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.8) 0%, rgba(66, 165, 245, 0.6) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: 'white',
                            color: '#1976d2',
                            fontWeight: 600,
                            '&:hover': {
                              bgcolor: '#f5f5f5',
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                      <Chip
                        label="Celebal Technologies"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          bgcolor: '#1976d2',
                          color: 'white',
                          fontWeight: 600,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                      />
                      {event.price === 0 && (
                        <Chip
                          label="FREE"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: '#4caf50',
                            color: 'white',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          }}
                        />
                      )}
                    </Box>
                    
                                         <CardContent sx={{ flexGrow: 1, p: 2 }}>
                       <Typography 
                         variant="h6" 
                         gutterBottom 
                         sx={{ 
                           fontWeight: 600,
                           lineHeight: 1.3,
                           mb: 1,
                           display: '-webkit-box',
                           WebkitLineClamp: 2,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden',
                           color: '#1976d2',
                         }}
                       >
                         {event.title}
                       </Typography>
                       
                       <Typography 
                         variant="body2" 
                         sx={{
                           display: '-webkit-box',
                           WebkitLineClamp: 3,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden',
                           mb: 2,
                           color: '#666',
                         }}
                       >
                         {event.description}
                       </Typography>
                       
                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                         <LocationIcon sx={{ fontSize: 16, mr: 1, color: '#1976d2' }} />
                         <Typography variant="body2" sx={{ color: '#666' }}>
                           {event.venue}
                         </Typography>
                       </Box>
                       
                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                         <TimeIcon sx={{ fontSize: 16, mr: 1, color: '#1976d2' }} />
                         <Typography variant="body2" sx={{ color: '#666' }}>
                           {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                         </Typography>
                       </Box>
                       
                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                         <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                           {event.price === 0 ? 'FREE' : `₹${event.price}`}
                         </Typography>
                         <Typography variant="body2" sx={{ color: '#666' }}>
                           {event.availableSeats} seats left
                         </Typography>
                       </Box>
                     </CardContent>
                    
                                         <CardActions sx={{ p: 2, pt: 0 }}>
                       <Button
                         fullWidth
                         variant="contained"
                         component={Link}
                         to={`/events/${event.id}`}
                         sx={{ 
                           textTransform: 'none',
                           fontWeight: 600,
                           py: 1.5,
                           bgcolor: '#1976d2',
                           color: 'white',
                           borderRadius: 2,
                           boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                           '&:hover': {
                             bgcolor: '#1565c0',
                             boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                             transform: 'translateY(-2px)',
                           },
                           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                         }}
                       >
                         {event.price === 0 ? 'Register Now' : 'Book Now'}
                       </Button>
                     </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Trending Events Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <TrendingIcon sx={{ fontSize: 32, color: '#1976d2', mr: 2 }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              Trending Now
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {trendingEvents.map((event) => (
              <Grid item xs={12} sm={6} md={3} key={event.id}>
                <EventCard event={event} variant="trending" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Events Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Featured Events
        </Typography>
        
        <Grid container spacing={3}>
          {featuredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" sx={{ mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/events"
            endIcon={<ArrowIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            View All Events
          </Button>
        </Box>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                50K+
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Events Booked
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                2L+
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Happy Users
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                25+
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Indian Cities
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                24/7
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Support
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            textAlign: 'center',
            p: 6,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            },
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, position: 'relative' }}>
            Ready to Book Your Next Event?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, position: 'relative' }}>
            Join millions of Indians who trust EventHub for their event bookings across 25+ cities
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/register"
            sx={{
              bgcolor: '#1565c0',
              color: 'white',
              '&:hover': {
                bgcolor: '#0d47a1',
                transform: 'translateY(-2px)',
              },
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            Get Started Today
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 