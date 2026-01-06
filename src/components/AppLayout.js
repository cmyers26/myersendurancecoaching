import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Coaching', path: '/coaching' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Myers Endurance Coaching
      </Typography>
      <List>
        {navigationLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              sx={{
                textAlign: 'center',
                backgroundColor:
                  location.pathname === link.path
                    ? 'rgba(0, 0, 0, 0.08)'
                    : 'transparent',
              }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 500,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Myers Endurance Coaching
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navigationLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.path}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    backgroundColor:
                      location.pathname === link.path
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Myers Endurance Coaching. All rights
            reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default AppLayout;

