import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import NextLink from "next/link";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';
import { Settings } from '@mui/icons-material';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Person2Icon from "@mui/icons-material/Person2";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HomeIcon from '@mui/icons-material/Home';
import { signOut } from "next-auth/react";
import scss from './SideMenu.module.scss';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const menuRouteList = ["analytics", "profile", "settings", ""];
const menuListTranslations = ["Data", "Profile", "Settings", "Sign Out"];
const menuListIcons = [<EqualizerIcon />, <Person2Icon />, <Settings />, <ExitToAppIcon />];

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
  }),
);

const SideMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const mobileCheck = useMediaQuery('(min-width: 600px)');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleListItemButtonClick = (text: string) => {
    text === 'Sign Out' ? signOut() : null;
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open} anchor='left' sx={{ 
      width: drawerWidth,
      [`& .MuiDrawer-paper`]: {
        left: 0,
        top: mobileCheck ? 69 : 57,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }, }}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuListTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <NextLink className={scss.link} href={`/dashboard/${menuRouteList[index]}`}>
            <ListItemButton onClick={() => handleListItemButtonClick(text)} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }} title={text} aria-label={text}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                {menuListIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: theme.palette.text.primary, opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu;