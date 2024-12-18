'use client'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { FallingLeavesBackground } from './(components)/fallingLeaves';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// -------------------
// Customize your colors, typography, etc.
// -------------------
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // your preferred primary color
    },
    secondary: {
      main: '#9c27b0', // your preferred secondary color
    },
    background: {
      default: '#f5f5f5', // global background color behind content
      paper: '#ffffff',   // default surface color
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});

export default function RootLayout(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // State for tracking which menus are open
  const [openMenus, setOpenMenus] = React.useState({});

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Toggle for submenu
  const handleToggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Nosso Blog', href: '/blog' },
    { label: 'Dicas', subLinks: [
        { label: 'Hoteis', href: '/infos/hotels' },
        { label: 'Restaurantes', href: '/infos/restaurants' },
        { label: 'Como Chegar?', href: '/infos/map' },
        { label: 'Mais dicas', href: '/infos/tips' },
    ] },
    { label: 'Presentes', subLinks: [
        { label: 'Lista de presentes', href: '/presents' },
        { label: 'Pagmentos', href: '/payment' },
    ] },
    { label: 'RSVP', href: '/rsvp' },
    { label: 'Entre em contato', href: '/contact' },
  ];

  const drawerContent = (
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        height: 'full'
      }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
        >
          <IconButton size='small' onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{width: '100%'}}>
          {navLinks.map((link) => (
            <React.Fragment key={link.label}>
              {link.subLinks ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleToggleMenu(link.label)}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: openMenus[link.label] ? 'rgba(0,0,0,0.1)' : 'transparent'
                      }}
                    >
                      <ListItemText primary={link.label} sx={{ textAlign: 'center' }} />
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={openMenus[link.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.05)' // A light grey background
                        }}
                     >
                      {link.subLinks.map((subLink) => (
                        <ListItem key={subLink.label} disablePadding>
                          <Link
                            href={subLink.href}
                            onClick={toggleDrawer(false)}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                              <ListItemText primary={subLink.label} sx={{ textAlign: 'center' }} 
                              primaryTypographyProps={{ fontSize: '0.875rem' }}
                              />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <Link
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ListItemText primary={link.label} sx={{ textAlign: 'center' }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>


      </Box>

      <Box>
        <Divider />
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} My Company
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            <FallingLeavesBackground />
  
            <AppBar position="sticky" color="primary">
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                      LOGO
                    </Typography>
                  </Box>
                </Link>
  
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    My Application
                  </Typography>
                </Link>
  
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon size='small' />
                </IconButton>
              </Toolbar>
            </AppBar>
  
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: {
                    xs: '100%', // On extra-small and small screens
                    sm: 300     // On medium and larger screens
                  }
                }
              }}
            >
              {drawerContent}
            </Drawer>
  
            {/* Main Content Area */}
            <Box component="main" sx={{ p: 2, position: 'relative', minHeight: '100vh' }}>
              {props.children}
            </Box>
  
            {/* Global Footer */}
            <Box component="footer" sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper' }}>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} My Company | <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
              </Typography>
            </Box>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
  
}
