import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MoonIcon from '@material-ui/icons/Brightness4';
import SunIcon from '@material-ui/icons/BrightnessHigh';

import { changeTheme } from 'store/actions/theme';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginLeft: theme.spacing(2.5),
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  toggleButton: {
    marginLeft: theme.spacing(2),
  },
}));

function TopBar(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const { location: { pathname } } = props;

  const toggleTheme = useCallback(
    () => dispatch(changeTheme(theme === 'light' ? 'dark' : 'light')),
    [dispatch, theme],
  );

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {pathname === '/' ? 'Converter' : 'History'}
          </Typography>

          {pathname !== '/' && (
            <Link to="/" className={classes.link}>Converter</Link>
          )}

          {pathname !== '/history' && (
            <Link to="/history" className={classes.link}>History</Link>
          )}

          <Tooltip title="Toggle Theme">
            <IconButton
              className={classes.toggleButton}
              edge="end"
              color="inherit"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

TopBar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(TopBar);
