import * as React from 'react'
import {
  Hidden,
  Drawer,
  makeStyles,
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

// importing constants
import drawerWidth from '../../../constants/sibebarWidth'
import shadow from '../../../constants/backgroundShadow'
//importing Components
import WorkspaceLogo from '../../../components/Logo'

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
  }
}))

// Componet
const Sidebar = () => {

  const classes = useCSS()
  const history = useHistory()

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


        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;