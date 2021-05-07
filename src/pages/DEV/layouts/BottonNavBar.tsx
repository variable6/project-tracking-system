import {
  Hidden, useMediaQuery, useTheme, CardActionArea,
  AppBar, Toolbar, makeStyles, IconButton
} from '@material-ui/core'
import { NavLink } from "react-router-dom";
import { v4 as getKey } from 'uuid'
import { FiMoreVertical as MenuIcon } from 'react-icons/fi'
import { useContext } from 'react'
import { DataContext } from '../DataContext'

import { pmRoutes, tlRoutes, devRoutes } from '../DEV.routes'
import RolePopup from './RolePopup';
import theme from '../../../constants/theme';

const routes = {
  'DEV': devRoutes,
  'PM': pmRoutes,
  'TL': tlRoutes
}


const BottonNavBar = () => {

  const { dispatch, data } = useContext(DataContext)
  const css = useCSS()

  const bottomRoutes = routes[data.role].filter(route => route.isInBottomNav === true)
  const profileRoute = routes[data.role].filter(route => route.label === 'Profile')[0]

  const smDown = useMediaQuery(useTheme().breakpoints.down('sm'))

  return (
    <Hidden mdUp implementation="css">
      <AppBar position="fixed" className={css.appBar}>
        <Toolbar>
          {
            (data.roleList.isPM || data.roleList.isTL) && (
              <IconButton edge="start" onClick={() => dispatch.openRoleModal()} >
                <MenuIcon />
              </IconButton>
            )
          }
          <div className={css.toolbar}>
          {
              bottomRoutes.map(route => (
                <NavLink key={getKey()} to={route.path} exact={route.path === '/'}
                className={css.navlink} activeClassName={css.activeNavLink} >
                  <CardActionArea className={css.iconContainer}>
                  {route.icon}
                  </CardActionArea>
              </NavLink>
            ))
          }
            <NavLink to={profileRoute.path} exact activeClassName={css.activeProfile}>
              <div style={{ flex: 1 }} className={css.iconContainer}>
                <IconButton className={css.profileRing}>
                  {profileRoute.icon}
                </IconButton>
              </div>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
      {smDown && <RolePopup />}
    </Hidden>
  )
}

export default BottonNavBar


const useCSS = makeStyles(({ palette, spacing }) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: palette.background.paper,
    boxShadow: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  navlink: {
    color: palette.text.secondary,
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  activeNavLink: {
    color: palette.primary.main
  },
  iconContainer: {
    flex: 1,
    width: spacing(7),
    height: theme.mixins.toolbar.minHeight,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 600,
    fontSize: spacing(3),
  },
  profileRing: {
    padding: 2,
    borderRadius: '50%',
    margin: 3
  },
  activeProfile: {
    '& .MuiAvatar-root.MuiAvatar-circle.MuiAvatar-colorDefault': {
      backgroundColor: palette.primary.main
    }
  }
}))