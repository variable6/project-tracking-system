import * as React from 'react'
import {
  Hidden,
  Drawer,
  makeStyles,
  Button,
  FormControl,
  Select,
  MenuItem, Typography, Avatar,
  CardActionArea
} from '@material-ui/core'
import { useHistory, NavLink } from 'react-router-dom'
import { v4 as key } from 'uuid'

// importing constants
import drawerWidth from '../../../constants/sibebarWidth'
import shadow from '../../../constants/backgroundShadow'
//importing Components
import WorkspaceLogo from '../../../components/Logo'
import Btn from '../../../components/Button'
// context & hooks
import { DataContext } from '../DataContext'
import { useStyles } from '../../../components/Sidebar'
// routes
import { pmRoutes, tlRoutes, devRoutes } from './../DEV.routes'
// types
import { RouteListType } from './../../../types'
import { AuthContext } from '../../../context/AuthContext'
import { FiUser } from 'react-icons/fi'


const NavLinksPM = ({ routes }: { routes: RouteListType[] }) => {

  const css = useStyles()

  return (
    <div className={css.root}>{
      routes.filter(route => route.isInBottomNav).map(link => (
        <NavLink key={key()} to={link.path} exact={link.path === '/'} className={css.link} activeClassName={css.active}>
          {link.icon}
          {link.label}
        </NavLink>
      ))
    }</div>
  )
}

// Componet
const Sidebar = () => {

  const classes = useCSS()
  const history = useHistory()
  const { data, dispatch } = React.useContext(DataContext)
  const { user, logout } = React.useContext(AuthContext)

  const routes = {
    'DEV': devRoutes,
    'PM': pmRoutes,
    'TL': tlRoutes
  }

  const profileRoute = routes[data.role].filter(route => route.label === 'Profile')[0]

  const profileHandler = () => history.push(profileRoute.path)

  const logoClickHandler = () => {
    if (history.location.pathname !== '/')
      history.push('/')
  }

  return (
    <nav className={classes.drawer} aria-label="sidebar navigation">
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.border
          }}
          variant="permanent"
          open
        >
          <Button aria-label="WorkSpace" onClick={logoClickHandler}
            className={classes.logoContainer}>
            <WorkspaceLogo />
          </Button>
          <div className={classes.sidebarContainer}>
            {
              (data.roleList.isPM || data.roleList.isTL) && (
                <FormControl variant="outlined" size="small" style={{ marginTop: 20 }} className={classes.role}>
                  <Select value={data.role} onChange={({ target }) => {
                    const val = target.value
                    if (val === data.role) {
                      dispatch.closeRoleModal()
                    } else {
                      if (val === 'PM')
                        dispatch.setRole('PM')
                      else if (val === 'TL')
                        dispatch.setRole('TL')
                      else if (val === 'DEV')
                        dispatch.setRole('DEV')
                      history.push('/')
                      dispatch.closeRoleModal()
                    }
                  }}>
                    <MenuItem value="DEV">Software Devloper</MenuItem>
                    {data.roleList.isTL && (
                      <MenuItem value="TL" >Team Leader</MenuItem>
                    )}
                    {data.roleList.isPM && (
                      <MenuItem value="PM" >Project Manager</MenuItem>
                    )}
                  </Select>
                </FormControl>
              )
            }
            <NavLinksPM routes={routes[data.role]} />
            <div className={classes.profileContainer}>
              <CardActionArea className={classes.detailsContainer} aria-label="profile" onClick={profileHandler}>
                <Avatar className={classes.avatar}>
                  <FiUser />
                </Avatar>
                <div className={classes.textContainer}>
                  <Typography variant="body1" style={{ fontWeight: 600 }} color="textPrimary">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {user.employeeId}
                  </Typography>
                </div>
              </CardActionArea>
              <Btn.Secondary label="Logout" onClick={logout} />
            </div>
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;


//----------> StyleSheet
const useCSS = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  border: {
    border: 'none'
  },
  logoContainer: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.75),
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    transitionProperty: 'background-color',
    transitionDuration: '250ms',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  appbar: {
    top: 'auto',
    bottom: 0,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
    filter: shadow
  },
  bottomNav: {
    width: '100%',
    '& svg': {
      fontSize: theme.spacing(2.85),
      marginBottom: theme.spacing(-1.2),
      marginTop: theme.spacing(0.75)
    }
  },
  sidebarContainer: {
    margin: `${theme.spacing(5)}px 0px`,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    'justify-content': 'space-evenly',
  },
  role: {
    padding: theme.spacing(1.75),
  },
  profileContainer: {
    margin: theme.spacing(1.75),
    display: 'flex',
    flexDirection: 'column'
  },
  detailsContainer: {
    padding: theme.spacing(0.5),
    display: 'flex',
    marginBottom: theme.spacing(1.5),
    cursor: 'pointer',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.spacing(4.01),
    color: theme.palette.secondary.main,
    width: theme.spacing(7.1),
    height: theme.spacing(7.1)
  },
  textContainer: {
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
    marginLeft: theme.spacing(1.75)
  }
}))