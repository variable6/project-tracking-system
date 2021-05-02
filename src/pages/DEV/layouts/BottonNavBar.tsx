import {
  Hidden,
  AppBar, Toolbar, makeStyles, IconButton
} from '@material-ui/core'
import { NavLink } from "react-router-dom";
import { v4 as getKey } from 'uuid'
import { FiMoreVertical as MenuIcon } from 'react-icons/fi'

import { pmRoutes } from '../DEV.routes'

const bottomRoutes = pmRoutes.filter(route => route.isInBottomNav === true)
const profileRoute = pmRoutes.filter(route => route.label === 'Profile')[0]

console.log(profileRoute)

const BottonNavBar = () => {

  const css = useCSS()

  return (
    <Hidden mdUp implementation="css">
      <AppBar position="fixed" className={css.appBar}>
        <Toolbar>
          <IconButton edge="start" >
            <MenuIcon />
          </IconButton>
          <div className={css.toolbar}>
          {
              bottomRoutes.map(route => (
              <NavLink key={getKey()} to={route.path} exact
                className={css.navlink} activeClassName={css.activeNavLink} >
                  <div className={css.iconContainer}>
                  {route.icon}
                  </div>
              </NavLink>
            ))
          }
            <NavLink to={profileRoute.path} exact activeClassName={css.activeProfile}>
              <div className={css.iconContainer}>
                <div className={css.profileRing}>
                  {profileRoute.icon}
                </div>
              </div>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
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
    fontWeight: 600,
    fontSize: spacing(3)
  },
  activeNavLink: {
    color: palette.primary.main
  },
  iconContainer: {
    width: spacing(7),
    display: 'grid',
    placeItems: 'center'
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