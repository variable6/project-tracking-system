import { createContext, useState, ReactNode } from 'react'
import { Alert } from '@material-ui/lab'
import appbarHeight from '../constants/appbarHeight'
import {
  Snackbar,
  makeStyles,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

const useCSS = makeStyles(theme => ({
  alert: {
    top: appbarHeight + theme.spacing(1)
  }
}))

interface AlertType {
  open: boolean,
  message: string,
  type: 'message' | 'error' | 'success'
}

interface AuthContextType {
  alert: AlertType
  setAlert: (val: AlertType) => any
  openAlert: (val: { message: string, type: 'message' | 'error' | 'success' }) => void
}

const AlertContext = createContext<AuthContextType>({
  alert: {
    open: false,
    message: '',
    type: 'message'
  },
  setAlert: () => null,
  openAlert: function () { }
})

const AC = (props: { children: ReactNode }) => {

  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const [alert, setAlert1] = useState<AlertType>({
    open: false,
    message: '',
    type: 'message'
  })

  const closeAlert = () => setAlert1({
    open: false,
    message: '',
    type: 'message'
  })

  const setAlert = ({ open, message, type }: AlertType) => setAlert1({
    open: open,
    message: message,
    type: type
  })

  const getType = (val: 'message' | 'error' | 'success') => val === 'message' ? 'info' : val

  const openAlert = (val: { message: string, type: 'message' | 'error' | 'success' }) => {
    setAlert({
      open: true,
      message: val.message,
      type: val.type
    })
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert, openAlert }} >
      <Snackbar
        open={alert.open} autoHideDuration={6000} onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: isMobile ? 'center' : 'right' }}
        className={useCSS().alert}
      >
        <Alert severity={getType(alert.type)} elevation={6} onClose={closeAlert} >
          {alert.message}
        </Alert>
      </Snackbar>
      { props.children}
    </AlertContext.Provider>
  )
}

export { AlertContext }

export default AC