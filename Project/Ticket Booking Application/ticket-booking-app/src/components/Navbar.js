import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
  InputBase,
  Badge,
  Divider,
  Chip,
  FormControl,
  Select,
  MenuItem as MuiMenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  LocationOn as LocationIcon,
  Movie as MovieIcon,
  SportsEsports as SportsIcon,
  MusicNote as MusicIcon,
  TheaterComedy as TheaterIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #e0e0e0',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
}));

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/dashboard');
  };

  const handleAdminClick = () => {
    handleMenuClose();
    navigate('/admin');
  };

  const handleMyBookingsClick = () => {
    handleMenuClose();
    navigate('/my-bookings');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const indianCities = [
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Delhi', state: 'NCR' },
    { name: 'Bangalore', state: 'Karnataka' },
    { name: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Kolkata', state: 'West Bengal' },
    { name: 'Pune', state: 'Maharashtra' },
    { name: 'Ahmedabad', state: 'Gujarat' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Lucknow', state: 'Uttar Pradesh' },
    { name: 'Chandigarh', state: 'Punjab' },
    { name: 'Indore', state: 'Madhya Pradesh' },
  ];

  const categoryItems = [
    { text: 'Movies', path: '/events?category=movies', icon: <MovieIcon />, color: '#E50914' },
    { text: 'Sports', path: '/events?category=sports', icon: <SportsIcon />, color: '#2ed573' },
    { text: 'Music', path: '/events?category=music', icon: <MusicIcon />, color: '#3742fa' },
    { text: 'Theater', path: '/events?category=theater', icon: <TheaterIcon />, color: '#ffa502' },
  ];

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Events', path: '/events' },
  ];

  const authenticatedMenuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'My Bookings', path: '/my-bookings', icon: <EventIcon /> },
  ];

  const adminMenuItems = [
    { text: 'Admin Panel', path: '/admin', icon: <AdminIcon /> },
  ];

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          color="inherit"
          component={Link}
          to={item.path}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(229, 9, 20, 0.1)',
              color: 'primary.main'
            }
          }}
        >
          {item.text}
        </Button>
      ))}
      
      {isAuthenticated && (
        <>
          {authenticatedMenuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  color: 'primary.main'
                }
              }}
            >
              {item.text}
            </Button>
          ))}
          
          {isAdmin && adminMenuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  color: 'primary.main'
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        color="inherit"
        onClick={handleMobileMenuOpen}
        sx={{ display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: 70 }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <EventIcon sx={{ fontSize: 28 }} />
          EventHub
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 4 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearch}>
              <StyledInputBase
                placeholder="Search for events, movies, sports..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </Search>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && renderDesktopMenu()}

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Location Selector */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value="Mumbai"
              displayEmpty
              sx={{ 
                color: 'text.secondary',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
                '&:hover': {
                  backgroundColor: 'rgba(229, 9, 20, 0.1)',
                  color: 'primary.main'
                }
              }}
            >
              {indianCities.map((city) => (
                <MuiMenuItem key={city.name} value={city.name}>
                  <LocationIcon sx={{ fontSize: 16, mr: 1 }} />
                  {city.name}, {city.state}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <IconButton color="inherit" sx={{ position: 'relative' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* User Avatar */}
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ p: 0 }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    color: 'primary.main'
                  }
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && renderMobileMenu()}
        </Box>

        {/* Desktop Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          
          <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
            <DashboardIcon sx={{ mr: 2, color: 'text.secondary' }} />
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleMyBookingsClick} sx={{ py: 1.5 }}>
            <EventIcon sx={{ mr: 2, color: 'text.secondary' }} />
            My Bookings
          </MenuItem>
          {isAdmin && (
            <MenuItem onClick={handleAdminClick} sx={{ py: 1.5 }}>
              <AdminIcon sx={{ mr: 2, color: 'text.secondary' }} />
              Admin Panel
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
            Sign Out
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 250,
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }
          }}
        >
          {/* Categories */}
          <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categoryItems.map((item) => (
                <Chip
                  key={item.text}
                  icon={item.icon}
                  label={item.text}
                  size="small"
                  sx={{ 
                    bgcolor: item.color,
                    color: 'white',
                    '&:hover': { opacity: 0.8 }
                  }}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                />
              ))}
            </Box>
          </Box>

          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              sx={{ py: 1.5 }}
            >
              {item.text}
            </MenuItem>
          ))}
          
          {isAuthenticated && (
            <>
              {authenticatedMenuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  sx={{ py: 1.5 }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 2 }}>{item.text}</Typography>
                </MenuItem>
              ))}
              
              {isAdmin && adminMenuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  sx={{ py: 1.5 }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 2 }}>{item.text}</Typography>
                </MenuItem>
              ))}
              
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                Sign Out
              </MenuItem>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <Divider />
              <MenuItem component={Link} to="/login" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                Sign In
              </MenuItem>
              <MenuItem component={Link} to="/register" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                Sign Up
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 