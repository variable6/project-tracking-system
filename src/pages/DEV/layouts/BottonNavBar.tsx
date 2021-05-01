import {
  Hidden,
  AppBar, Toolbar, makeStyles
} from '@material-ui/core'
import { NavLink } from "react-router-dom";
import { v4 as getKey } from 'uuid'

import { pmRoutes } from '../DEV.routes'

const BottonNavBar = () => {

  const css = useCSS()

  return (
    <Hidden mdUp implementation="css">
      <AppBar position="fixed" className={css.appBar}>
        <Toolbar className={css.toolbar}>
          {
            pmRoutes.map(route => (
              <NavLink key={getKey()} to={route.path} exact
                className={css.navlink} activeClassName={css.activeNavLink} >
                {route.icon}
              </NavLink>
            ))
          }
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
    justifyContent: 'space-around'
  },
  navlink: {
    color: palette.text.secondary,
    fontWeight: 600,
    fontSize: spacing(3)
  },
  activeNavLink: {
    color: palette.primary.main
  }
}))