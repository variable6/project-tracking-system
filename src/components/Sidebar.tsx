import * as React from 'react'
import {
  Hidden,
  Drawer,
  makeStyles,
  Button, AppBar, Toolbar, BottomNavigation, BottomNavigationAction
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import {
  v4 as setKey
} from 'uuid'
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
  },
  bottomNav: {
    width: '100%',
    '& svg': {
      fontSize: theme.spacing(2.75),
      marginBottom: theme.spacing(-0.5)
    }
  }
}))
// Props type
interface Props {
  children: React.ReactNode
  mobileNavbar: { label: string, path: string, icon: React.ReactNode }[]
}
// Componet
const Sidebar = ({ children, mobileNavbar }: Props) => {

  const drawer = children
  const classes = useCSS()
  const history = useHistory()

  const [bottomNav, setBottomNav] = React.useState(history.location.pathname)


  React.useEffect(() => {
    return history.listen(location => {
      setBottomNav(location.pathname)
    })
  }, [history])

  const bottomNavHandler = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue)
  }

  return (
    <>
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
            <Button aria-label="WorkSpace" onClick={() => history.push('/')}
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
            <BottomNavigation value={bottomNav}
              onChange={bottomNavHandler} className={classes.bottomNav}>
              {
                mobileNavbar.map(link => (
                  <BottomNavigationAction key={setKey()}
                    label="︎•" value={link.path} icon={link.icon}
                  />
                ))
              }
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