import * as React from 'react'
import {
  Hidden,
  Drawer,
  makeStyles,
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
// importing constants
import drawerWidth from '../constants/sibebarWidth'
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
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
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
          >
            <WorkspaceLogo />
          </Button>
          {mobileSidebar}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.border
          }}
          variant="permanent"
          open
        >
          <Button onClick={() => history.replace('/')}
            className={classes.logoContainer}>
            <WorkspaceLogo />
          </Button>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;