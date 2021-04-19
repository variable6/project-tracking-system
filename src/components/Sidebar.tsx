import * as React from 'react'
import {
  Hidden,
  Drawer,
  makeStyles,
  Button, AppBar, Toolbar, Typography, BottomNavigation
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
// importing constants
import drawerWidth from '../constants/sibebarWidth'
import shadow from '../constants/backgroundShadow'
//importing Components
import WorkspaceLogo from '../components/Logo'

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
  }
}))
// Props type
interface Props {
  mobileOpen: boolean
  setMobileOpen: () => void
  children: React.ReactNode
  mobileSidebar: React.ReactNode
}
// Componet
const Sidebar = ({ mobileOpen, setMobileOpen, children, mobileSidebar }: Props) => {

  const drawer = children
  const classes = useCSS()
  const history = useHistory()
  // toggle handler for small devices
  const handleDrawerToggle = () => {
    setMobileOpen()
  };

  return (
    <>
      <nav className={classes.drawer} aria-label="sidebar navigation">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Hidden mdUp implementation="css">
        <Drawer
          // container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.border
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Button onClick={() => { history.replace('/'); setMobileOpen() }}
            className={classes.logoContainer}
            aria-label="WorkSpace"
          >
            <WorkspaceLogo />
          </Button>
          {mobileSidebar}
          <span style={{ marginBottom: 'auto', marginTop: 'auto' }} />
        </Drawer>
      </Hidden> */}
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.border
          }}
          variant="permanent"
          open
        >
          <Button aria-label="WorkSpace" onClick={() => history.replace('/')}
            className={classes.logoContainer}>
            <WorkspaceLogo />
          </Button>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
      <Hidden mdUp implementation="css">
        <AppBar position="fixed" color="default" className={classes.appbar}>
          <Toolbar>
            <BottomNavigation>

            </BottomNavigation>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
}

const useStyles = makeStyles(({ spacing, palette, shape }) => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: spacing(2),
    marginRight: spacing(2),
    padding: spacing(1.25),
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius
  },
  link: {
    display: 'flex',
    padding: `${spacing(1)}px ${spacing(1.75)}px`,
    marginTop: spacing(1.25),
    marginBottom: spacing(1.25),
    fontSize: spacing(1.75),
    letterSpacing: 0.35,
    textTransform: 'uppercase',
    fontWeight: 500,
    textDecoration: 'none',
    borderRadius: shape.borderRadius,
    color: palette.primary.contrastText,
    alignItems: 'center',
    '& > svg': {
      fontSize: spacing(2.75),
      marginRight: spacing(1.25)
    }
  },
  active: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main
  }
}))

export { useStyles }

export default Sidebar;