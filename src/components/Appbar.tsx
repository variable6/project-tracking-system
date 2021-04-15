import * as React from 'react'
import {
  Avatar,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import {
  FiPower,
  FiAlignLeft as MenuIcon,
  FiMoreHorizontal as MoreIcon
} from 'react-icons/fi'
import Moment from 'react-moment'
//import constants
import appbarHeigth from '../constants/appbarHeight'
import sibebarWidth from '../constants/sibebarWidth'
//importing Context
import { RouteContext } from '../context/RouteContext'
import { AuthContext } from '../context/AuthContext'
import { ProfileContext } from '../context/ProfilePageContext'

// component
const Appbar = React.memo(function Appbar(props: { setMobileOpen: () => void }) {

  const css = useCSS()
  const isSM = useMediaQuery(useTheme().breakpoints.down('sm'))

  const [dateTime, setDateTime] = React.useState(new Date())
  const route = React.useContext(RouteContext)
  const { user, logout } = React.useContext(AuthContext)
  const { openProfile } = React.useContext(ProfileContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const startTime = () => {
      setDateTime(new Date())
      setTimeout(startTime, 1500)
    }
    startTime()
    const l = setTimeout(startTime, 1500);
    return () =>
      clearInterval(l);
  }, [])

  return (
    <div className={css.appbar}>
      <div className={css.toolbar}>
        <div className={css.bar}>
          {isSM && (
            <IconButton style={{ marginRight: 5 }}
              edge="start" onClick={props.setMobileOpen} >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" style={{ fontWeight: 600, flexGrow: 1 }} color="secondary">
            {route.context.pageTitle}
          </Typography>
          <div className={css.time}>
            <Moment format="ddd DD, hh:mm a" date={dateTime} />
          </div>
          {
            isSM ? (
              <IconButton onClick={handleClick} aria-label="more" edge="end">
                <MoreIcon />
              </IconButton>
            ) : (
              <div className={css.displayNameContainer}>
                  <Button aria-label="profile" onClick={openProfile}>
                    <Avatar children={user.name[0].toUpperCase()} className={css.avatar} />
                  <Typography className={css.displayName} color="secondary" variant="h6">
                    {user.name}
                  </Typography>
                </Button>
              </div>
            )
          }
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => { openProfile(); handleClose() }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
          <div className={css.logoutContainer}>
            <Tooltip classes={useTooltipStyle()} title="Logout">
              <IconButton edge="end" onClick={logout} >
                <FiPower className={css.logoutIcon} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Appbar;


// tooltip style
const useTooltipStyle = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.spacing(1.75)
  }
}))



//Styles
const useCSS = makeStyles(theme => ({
  appbar: {
    height: appbarHeigth,
    position: 'fixed',
    right: 0,
    left: sibebarWidth,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      left: 0,
      backgroundColor: 'rgba(0,0,0,0)',
      backdropFilter: 'blur(5px)'
    },
    zIndex: 2,
  },
  toolbar: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    }
  },
  bar: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    height: appbarHeigth - theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2))',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  logoutIcon: {
    color: theme.palette.secondary.light,
    fontSize: theme.spacing(2.75)
  },
  displayNameContainer: {
    paddingRight: theme.spacing(1),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.text.disabled,
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      borderRight: 'none',
      marginRight: theme.spacing(0),
    }
  },
  time: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    padding: theme.spacing(1.15),
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
    '@media only screen and (max-width: 600px)': {
      display: 'none'
    },
    '@media only screen and (min-width: 960px) and (max-width: 1080px)': {
      display: 'none'
    }
  },
  displayName: {
    fontWeight: 600, margin: '0 5px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    fontSize: theme.spacing(2.25)
  },
  logoutContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600
  }
}))