import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: theme.palette.divider,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


export default function Header() {
  const classes = useStyles();
  const theme = useTheme();

  const loggedUser = useSelector(state => state.user.current.id)
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const enable = Boolean(anchorEl);

  const currentUserId = useSelector(state => state.user.current.id);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!currentUserId) return
    const checkUserRole = async () => {
      try {
        const getUserDetailData = await userApi.getUserData({ currentUserId });
        setUserData(getUserDetailData);
      } catch (error) {
        console.log(error)
      }
    }
    checkUserRole();
  }, [currentUserId]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut().then(() => {
        console.log("User successfully logged out");
        localStorage.clear();
        window.location = "/";
      }).catch(error => console.log('Something went wrong! ', error))
    } else {
      alert('user already logged out.');
      return true;
    }
  };


  return (
    <React.Fragment>
      <CssBaseline>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link className="Link" to="/">
            <Button size="large">Home</Button>
          </Link>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Welcome to Ticketing Coach 1.0
          </Typography>
          {loggedUser ?
            (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={enable}
                  onClose={handleClose}
                >
                  <MenuItem >
                    <Link className="Link" to="/user/get/currentuser">
                      Profile
                    </Link>
                  </MenuItem>
                  {userData.role === "user"
                    ? (
                      <div>
                        <MenuItem >
                          <Link className="Link" to="/ticket/myticket">
                            My Ticket
                          </Link>
                        </MenuItem>
                      </div>
                    ) : (
                      <div></div>
                    )}

                  <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Link className="Link" to="/account">
                  <Button size="large">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
        </Toolbar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link className="Link" to="/coach">
              <IconButton>
                <AirportShuttleIcon />List Coaches
              </IconButton>
            </Link>
            <Divider />
            {userData.role === "coachOwner" ? (
                <div>
                  <Link className="Link" to="/coach/create/coach">
                    <IconButton>
                      <DirectionsBusIcon />Create new Coach
                    </IconButton>
                  </Link>
                  <Divider />
                  <Link className="Link" to="/statistic">
                    <IconButton>
                      <EqualizerIcon />My Coaches
                    </IconButton>
                  </Link>
                </div>
              ) : (userData.role === "admin" && (
                <div>
                  <Link className="Link" to="/admin">
                    <IconButton>
                      <EqualizerIcon />User Accounts
                    </IconButton>
                  </Link>
                </div>
              ))}
          </List>
        </Drawer>
      </CssBaseline>
    </React.Fragment>
  );
}
