import LandingPage from "./pages/landing-page";
import HR from './pages/HR'
import DEV from './pages/DEV'
import BDM from './pages/BDM'
import TokenContext from './context/TokenContext'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AlertContext from './context/AlertContext'
import stroage from './config/localStorageConfig'
import {
  Dialog, Button, DialogActions, DialogContent, withStyles, fade, DialogTitle, Typography
} from '@material-ui/core'


const Popup = withStyles(theme => ({
  scrollPaper: {
    position: 'relative',
    backdropFilter: `blur(${theme.spacing(0.5)}px)`,
    backgroundColor: fade(theme.palette.background.paper, 0.1)
  },
  paper: {
    position: 'absolute',
    top: '18%',
    [theme.breakpoints.down('sm')]: {
      top: 'auto',
      bottom: theme.spacing(0)
    }
  }
}))(Dialog)

const dashboard = {
  HR: <HR />,
  BDM: <BDM />,
  DEV: <DEV />
}

const App = () => {

  const { user, clearUser, openPopup, quitLogout } = useContext(AuthContext)

  const history = useHistory()

  const removeUser = () => {
    quitLogout()
    history.replace('/')
    clearUser()
    stroage.clearAll()
  }

  return (
    <TokenContext>
      <AlertContext>
        <Popup open={openPopup} onClose={quitLogout} aria-labelledby="Logout">
          <DialogTitle id="logout">
            <Typography variant="h5" color="secondary">
              Are you sure?
              </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" color="secondary">
              Do you really what to <strong>logout</strong> now.
              </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={quitLogout} color="default">
              No
              </Button>
            <Button disableElevation color="primary" variant="contained" onClick={removeUser}>
              Yes, I'm
              </Button>
          </DialogActions>
        </Popup>
        {
          user.employeeId ? dashboard[user.designation] : <LandingPage />
        }
      </AlertContext>
    </TokenContext>
  )
}

export default App;
