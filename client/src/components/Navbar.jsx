/**
 * @author Vaishwi Patel (B00914336)
 * This module imports various components from the Material-UI library and the useNavigate hook from the React-Router library.
 * These components are used to create a custom AppBar component for the application.
 */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router';


const p = localStorage.getItem("pages")
console.log(JSON.parse(p))
let pages = []
if(p!==null){
  pages = JSON.parse(p)
}
else{
  console.log(" In pages null")
}


// const pages = [{'pageName':'Organizers','route':'/organizers'},{'pageName':'Events','route':'/'},{'pageName':'Authentication Requests','route':'/authenticationRequests'}]
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const settings = [{'settingName':'Profile','route':'/'},{'settingName':'Dashboard','route':'/'},{'settingName':'Logout','route':'/logout'}]
var settings = []

/**
 * An array of objects representing the settings available to different types of users.
 * Each object in the array contains a 'settingName' property, which is a string representing the name of the setting,
 * and a 'route' property, which is a string representing the URL route for the setting.
 */
const organizationSettings = [
  { 'settingName': 'Profile', 'route': '/organizerProfile' },
  { 'settingName': 'Dashboard', 'route': '/' },
  { 'settingName': 'Logout', 'route': '/logout' }
];
const userSettings = [
  { 'settingName': 'Profile', 'route': '/attendeeProfile' },
  { 'settingName': 'Dashboard', 'route': '/' },
  { 'settingName': 'Logout', 'route': '/logout' }
];
const adminSettings = [
  { 'settingName': 'Profile', 'route': '/' },
  { 'settingName': 'Dashboard', 'route': '/' },
  { 'settingName': 'Logout', 'route': '/logout' }
];

function ResponsiveAppBar() {
  const user = localStorage.getItem("user");
  const IS_ATTENDEE = JSON.parse(user).userType == "attendee";
  const IS_ORGANIZER = JSON.parse(user).userType == "organizer";
  const IS_ADMIN = JSON.parse(user).userType == "admin";

  if (IS_ATTENDEE) {
    settings = userSettings
  }
  else if (IS_ORGANIZER) {
    settings = organizationSettings
  }
  else if (IS_ADMIN) {
    settings = adminSettings
  }

  const navigate = useNavigate();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(anchorElUser)
  };

  /**
   * Closes the navigation menu and navigates to the selected page.
   * @param {{Object}} page - The page object containing the route to navigate to.
   */
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    console.log(page)
    navigate(page.route)
  };

  /**
   * Handles the closing of the user menu and navigates to the appropriate route based on the setting.
   * @param {{object}} setting - The setting object that was clicked in the user menu.
   */
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    console.log(setting.route)
    if (setting.route == '/organizerProfile') {
      navigate(setting.route, {state: {organizerId: JSON.parse(user).id}})
    }
    else{
      navigate(setting.route)
    }
  };

  /**
   * Renders the top navigation bar of the Eventify application.
   * @returns A JSX element that displays the navigation bar.
   */
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Eventify
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.pageName} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href=""
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      EVENTIFY
                    </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.settingName} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting.settingName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
