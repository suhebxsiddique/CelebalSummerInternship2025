import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: '#1e272e',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              EventHub
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8, lineHeight: 1.6 }}>
              India's premier event booking platform. From Bollywood concerts to IPL matches, 
              discover and book the best events across 25+ Indian cities.
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/events" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Events
              </Link>
              <Link href="/about" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                About Us
              </Link>
              <Link href="/contact" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Contact
              </Link>
              <Link href="/help" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Help & Support
              </Link>
            </Box>
          </Grid>

          {/* Event Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/events?category=movies" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Movies
              </Link>
              <Link href="/events?category=sports" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Sports
              </Link>
              <Link href="/events?category=music" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Music
              </Link>
              <Link href="/events?category=theater" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Theater
              </Link>
              <Link href="/events?category=comedy" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Comedy
              </Link>
            </Box>
          </Grid>

          {/* Indian Cities */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Popular Cities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/events?city=mumbai" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Mumbai
              </Link>
              <Link href="/events?city=delhi" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Delhi
              </Link>
              <Link href="/events?city=bangalore" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Bangalore
              </Link>
              <Link href="/events?city=chennai" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Chennai
              </Link>
              <Link href="/events?city=hyderabad" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Hyderabad
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Mumbai, Maharashtra
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  support@eventhub.in
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  www.eventhub.in
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} EventHub. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Link href="/privacy" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Privacy Policy
            </Link>
            <Link href="/terms" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Terms of Service
            </Link>
            <Link href="/refund" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Refund Policy
            </Link>
          </Box>
        </Box>

        {/* Celebal Internship Attribution */}
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6, mb: 1 }}>
            Developed as part of the Celebal Technologies Summer Internship 2025
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6, fontWeight: 600 }}>
            Developer: Suheb Siddique | Project: Indian Event Booking Platform
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 