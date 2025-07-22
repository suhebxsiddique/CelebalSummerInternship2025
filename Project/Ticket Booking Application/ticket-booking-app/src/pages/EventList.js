import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Slider,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
  Rating,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  TrendingUp as TrendingIcon,
  Movie as MovieIcon,
  SportsEsports as SportsIcon,
  MusicNote as MusicIcon,
  TheaterComedy as TheaterIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const EventList = () => {
  const { events } = useBooking();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const categories = [
    { name: 'Movies', icon: <MovieIcon />, color: '#E50914' },
    { name: 'Sports', icon: <SportsIcon />, color: '#2ed573' },
    { name: 'Music', icon: <MusicIcon />, color: '#3742fa' },
    { name: 'Theater', icon: <TheaterIcon />, color: '#ffa502' },
    { name: 'Comedy', icon: <TheaterIcon />, color: '#ff6348' },
    { name: 'Workshops', icon: <EventIcon />, color: '#5352ed' },
  ];

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      
      const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
      
      const matchesAvailability = !showOnlyAvailable || event.availableSeats > 0;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (b.rating || 4.5) - (a.rating || 4.5);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedCategory, priceRange, showOnlyAvailable, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setShowOnlyAvailable(false);
    setSortBy('date');
    setSearchParams({});
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const EventCard = ({ event }) => (
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
          height="200"
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
        {event.trending && (
          <Chip
            icon={<TrendingIcon />}
            label="Trending"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'primary.main',
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
            <StarIcon sx={{ fontSize: 16, color: '#ffa502', mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {event.rating || '4.5'}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="subtitle1" 
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
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            ₹{event.price}
          </Typography>
          <Badge 
            badgeContent={event.availableSeats} 
            color={event.availableSeats > 0 ? 'success' : 'error'}
            sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}
          >
            <Chip
              label={event.availableSeats > 0 ? 'Available' : 'Sold Out'}
              size="small"
              color={event.availableSeats > 0 ? 'success' : 'error'}
              variant="outlined"
            />
          </Badge>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to={`/events/${event.id}`}
          disabled={event.availableSeats === 0}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            py: 1,
          }}
        >
          {event.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
        </Button>
      </CardActions>
    </Card>
  );

  const FilterDrawer = () => (
    <Drawer
      anchor="left"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          p: 2,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Filters
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Categories
      </Typography>
      <List dense>
        {categories.map((category) => (
          <ListItem key={category.name} button onClick={() => setSelectedCategory(category.name)}>
            <ListItemText 
              primary={category.name}
              sx={{
                '& .MuiListItemText-primary': {
                  color: selectedCategory === category.name ? 'primary.main' : 'inherit',
                  fontWeight: selectedCategory === category.name ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={2000}
        sx={{ mb: 2 }}
      />
      
      <Divider sx={{ my: 2 }} />
      
      <FormControlLabel
        control={
          <Switch
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
          />
        }
        label="Show only available events"
      />
      
      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          fullWidth
          sx={{ mb: 1 }}
        >
          Clear All Filters
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilterDrawerOpen(false)}
          fullWidth
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Discover Events
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find and book amazing events happening around you
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search events, venues, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setFilterDrawerOpen(true)}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Filters
            </Button>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => setViewMode('grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                color={viewMode === 'list' ? 'primary' : 'default'}
              >
                <ViewListIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Category Tabs */}
        <Box sx={{ mt: 3 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 100,
                textTransform: 'none',
                fontWeight: 600,
              },
            }}
          >
            <Tab label="All Events" value="" />
            {categories.map((category) => (
              <Tab
                key={category.name}
                label={category.name}
                value={category.name}
                sx={{
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: category.color,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Paper>

      {/* Results Count */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </Typography>
        
        {(searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 2000 || showOnlyAvailable) && (
          <Button
            size="small"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            sx={{ textTransform: 'none' }}
          >
            Clear all filters
          </Button>
        )}
      </Box>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary'
          }}
        >
          <EventIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            No events found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Try adjusting your search criteria or filters
          </Typography>
          <Button
            variant="contained"
            onClick={handleClearFilters}
            sx={{ textTransform: 'none' }}
          >
            Clear all filters
          </Button>
        </Box>
      )}

      <FilterDrawer />
    </Container>
  );
};

export default EventList; 