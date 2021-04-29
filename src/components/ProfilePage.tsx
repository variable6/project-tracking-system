import {
  makeStyles, 
  Drawer, Typography, IconButton,
  Avatar, AppBar, Tab, withStyles, Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  OutlinedInput,
  InputAdornment, Checkbox, FormControlLabel, TextField,
} from '@material-ui/core'
import {
  useState,
  ChangeEvent,
  useContext,
  useEffect,
  FormEvent,
  useRef
} from 'react'
import { useHistory } from 'react-router-dom'
import { Alert, TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
  FiChevronRight as CloseIcon,
  FiUser as UserIcon,
  FiKey,
  FiAtSign as EmailIcon
} from 'react-icons/fi'
import Card from './Card'
import { ProfileContext } from '../context/ProfilePageContext'
import { AuthContext } from '../context/AuthContext'
import { AlertContext } from '../context/AlertContext'
import desigantion from '../constants/designation'
import axiosConfig from '../config/axiosConfig'
import storage from '../config/localStorageConfig'
import FormLoader from './FormLoader'
import Btn from './Button'
import isName from '../constants/isName'

const Profile = withStyles(({ breakpoints, spacing }) => ({
  root: {
    [breakpoints.up('sm')]: {
      backdropFilter: `blur(${spacing(0.5)}px)`,
    }
  }
}))(Drawer)

interface StateTypes {
  options: '' | 'PWD' | 'EDIT'
  activeStep: number
  showPassword: boolean
  isSubmitting: boolean
  hasAlert: boolean
  alert: {
    message: string,
    type: 'error' | 'warning' | 'info'
  }
  old: string
}

const ProfilePage = () => {

  const { isProfileOpen, closeProfile } = useContext(ProfileContext)
  const { user, clearUser, addUser } = useContext(AuthContext)
  const { openAlert } = useContext(AlertContext)

  const initState: StateTypes = {
    options: '',
    activeStep: 0,
    showPassword: false,
    isSubmitting: false,
    hasAlert: false,
    alert: {
      message: '',
      type: 'info'
    },
    old: ''
  }

  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/
  const emailRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordFormRef = useRef<HTMLFormElement>(null)

  const changePasswordRef = useRef<HTMLInputElement>(null)
  const confirmChangePasswordRef = useRef<HTMLInputElement>(null)
  const changePasswordFormRef = useRef<HTMLFormElement>(null)

  const nameFieldRef = useRef<HTMLInputElement>(null)
  const emailFieldRef = useRef<HTMLInputElement>(null)
  const editFormRef = useRef<HTMLFormElement>(null)

  const [value, setValue] = useState('1');
  const [state, setState] = useState<StateTypes>(initState)

  const closeProfileHandler = () => {
    closeProfile()
    setState(initState)
    confirmPasswordFormRef.current?.reset()
  }

  const css = useCSS()

  const history = useHistory()

  const nameValidator = () => {
    const name = nameFieldRef.current?.value
    let message = ''
    if (name && !isName(name))
      message = 'Invalid name, name must not contain any special characters or digits'
    nameFieldRef.current?.setCustomValidity(message)
  }

  const emailValidator = () => {
    const email = emailFieldRef.current?.value
    let message = ''
    if (email && !emailRegEx.test(email))
      message = 'Invalid Email'
    emailFieldRef.current?.setCustomValidity(message)
  }

  useEffect(() => {
    const current = history.location.pathname
    window.onpopstate = () => {
      if (isProfileOpen) {
        closeProfileHandler()
        history.replace(current)
      }
    }
  }, [isProfileOpen])

  const handleNextStep = () => {
    setState(c => ({ ...c, activeStep: c.activeStep + 1 }))
  };

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const passwordValidator = () => {
    let message: string
    if (changePasswordRef.current?.value.length === 0)
      message = ''
    else {
      if (changePasswordRef.current?.value === state.old)
        message = 'Old password and new password are same, they must be difference'
      else if (changePasswordRef.current && passwordRegEx.test(changePasswordRef.current?.value))
        message = ''
      else
        message = 'Password must contain at least one captical, one small, and one special character and length b/w 8 - 50 letters'
    }
    changePasswordRef.current?.setCustomValidity(message)
  }

  const rePasswordValidator = () => {
    let message: string
    if (changePasswordRef.current?.value === confirmChangePasswordRef.current?.value)
      message = ''
    else
      message = 'Password did not matched'
    confirmChangePasswordRef.current?.setCustomValidity(message)
  }

  const changePasswordBtnHandler = () => {
    setState(c => ({
      ...c,
      options: c.options === '' ? 'PWD' : '',
      alert: {
        message: '',
        type: c.alert.type
      },
      hasAlert: false,
      activeStep: 0
    }))
    confirmPasswordFormRef.current?.reset()
  }

  const editInfoBtnHandler = () => {
    setState(c => ({ ...c, options: c.options === 'EDIT' ? '' : 'EDIT' }))
  }

  const setFromLoader = () => {
    setState(cur => ({
      ...cur,
      isSubmitting: true
    }))
  }

  const removeFromLoader = () => {
    setState(cur => ({
      ...cur,
      isSubmitting: false
    }))
  }

  const getFormTitle = {
    '': 'Options',
    'PWD': 'Change Password',
    'EDIT': 'Edit Info'
  }

  const confirmPasswordFormHandler = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    setState(cur => ({
      ...cur,
      old: confirmPasswordRef.current ? confirmPasswordRef.current.value : ''
    }))

    if (navigator.onLine) {

      setFromLoader()

      axiosConfig()
        .post('user/confirm-password', {
          passwordOld: confirmPasswordRef.current?.value
        })
        .then(({ data }) => {
          removeFromLoader()

          if (data.isConfirm) {
            setState(cur => ({
              ...cur,
              hasAlert: false,
              alert: {
                message: '',
                type: 'error'
              }
            }))
            handleNextStep()
          }
          else
            setState(cur => ({
              ...cur,
              hasAlert: true,
              alert: {
                message: 'Incorrect password',
                type: 'error'
              }
            }))
        })
        .catch(({ response }) => {
          removeFromLoader()

          if (response?.data?.isConfirm === false) {
            setState(cur => ({
              ...cur,
              hasAlert: true,
              alert: {
                message: 'Incorrect password',
                type: 'error'
              }
            }))
          } else {
            setState(cur => ({
              ...cur,
              hasAlert: true,
              alert: {
                message: 'Something went wrong',
                type: 'error'
              }
            }))
          }
        })
    } else {
      setState(cur => ({
        ...cur,
        hasAlert: true,
        alert: {
          message: 'Check your internet connect, and try again',
          type: 'warning'
        }
      }))
    }
  }

  const changePasswordFormHandler = (event: FormEvent) => {

    event.preventDefault()

    setFromLoader()

    if (navigator.onLine) {

      axiosConfig()
        .post('user/changepassword', {
          passwordOld: state.old,
          passwordNew: changePasswordRef.current?.value
        })
        .then(({ data }) => {
          removeFromLoader()
          setState(initState)
          confirmPasswordFormRef.current?.reset()
          changePasswordFormRef.current?.reset()
          alert(`${data.message} successfully, you need to login again`)
          history.replace('/')
          clearUser()
          storage.clearAll()
        })
        .catch(({ response }) => {
          removeFromLoader()
          setState(initState)
          confirmPasswordFormRef.current?.reset()
          changePasswordFormRef.current?.reset()
          openAlert({
            message: response.data ? response.data.message : 'Something went wrong',
            type: 'error'
          })
        })
    } else {
      setState(cur => ({
        ...cur,
        hasAlert: true,
        alert: {
          message: 'Check your internet connect, and try again',
          type: 'warning'
        }
      }))
    }
  }

  const editInfoOnSubmit = () => {

    setFromLoader()

    axiosConfig()
      .post('user/profile', {
        name: nameFieldRef.current?.value,
        email: emailFieldRef.current?.value
      })
      .then(({ data }) => {

        removeFromLoader()

        setState(cur => ({
          ...cur,
          hasAlert: false,
          alert: {
            message: '',
            type: 'info'
          },
          options: ''
        }))
        addUser(data.data)
        openAlert({
          'type': data.type,
          'message': data.message
        })
      })
      .catch(({ response }) => {

        removeFromLoader()

        openAlert({
          message: (response.data) ? response.data.message : 'Something went worng',
          type: 'error'
        })
      })
  }

  const editInfoFormHandler = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (navigator.onLine)
      return editInfoOnSubmit()

    setState(cur => ({
      ...cur,
      hasAlert: true,
      alert: {
        message: 'Check your Internet connect',
        type: 'warning'
      }
    }))
  }

  const options = (
    <Card title={getFormTitle[state.options]}>
      <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
        <Button
          style={{ fontWeight: 600 }}
          disabled={state.options === 'PWD'}
          onClick={editInfoBtnHandler}>
          {state.options === 'EDIT' ? 'Cancel' : 'Edit info'}
        </Button>
        <Button
          style={{ fontWeight: 600 }}
          disabled={state.options === 'EDIT'}
          onClick={changePasswordBtnHandler}
        >
          {state.options === 'PWD' ? 'Cancel' : 'change password'}
        </Button>
      </div>
      {state.hasAlert && <Alert severity={state.alert.type}>{state.alert.message}</Alert>}
      <div style={{ display: state.options === 'PWD' ? 'block' : 'none', position: 'relative', marginTop: '16px' }}>
        {state.isSubmitting && <FormLoader />}
        <Stepper activeStep={state.activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Confirm Password
            </StepLabel>
            <StepContent>
              <form ref={confirmPasswordFormRef}
                onSubmit={confirmPasswordFormHandler} className={css.form} >
                <FormControl variant="outlined" size="small">
                  <OutlinedInput required
                    inputRef={confirmPasswordRef}
                    placeholder="Enter your current password"
                    type={state.showPassword ? 'text' : 'password'}
                    startAdornment={
                      <InputAdornment position="start">
                        <FiKey />
                      </InputAdornment>
                    }
                  />
                  <FormControlLabel
                    label="Show Password"
                    labelPlacement="end"
                    control={
                      <Checkbox
                        value={state.showPassword}
                        checked={state.showPassword}
                        onChange={() => setState(c => ({ ...c, showPassword: !c.showPassword }))}
                        color="primary"
                      />
                    }
                  />
                </FormControl>
                <div className={css.formBtnContainer}>
                  <Button color="primary" size="medium" disableElevation variant="contained" type="submit" >
                    confirm
                  </Button>
                </div>
              </form>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Change Password</StepLabel>
            <StepContent>
              <form onSubmit={changePasswordFormHandler}
                ref={changePasswordFormRef} className={css.form} >
                <FormControl variant="outlined" size="small" >
                  <Typography variant="body1" color="textPrimary">
                    Enter your new password
                  </Typography>
                  <TextField variant="outlined" size="small"
                    required
                    type="password"
                    inputRef={changePasswordRef}
                    onBlur={passwordValidator}
                  />
                </FormControl>
                <FormControl variant="outlined" size="small" >
                  <Typography variant="body1" color="textPrimary">
                    Confirm password
                  </Typography>
                  <TextField variant="outlined" size="small"
                    required
                    type="password"
                    inputRef={confirmChangePasswordRef}
                    onBlur={rePasswordValidator}
                  />
                </FormControl>
                <div className={css.formBtnContainer}>
                  <Btn.Secondary label="clear" onClick={() => changePasswordFormRef.current?.reset()} />
                  <Btn.Primary type="submit" label="continue" />
                </div>
              </form>
            </StepContent>
          </Step>
        </Stepper>
      </div>
      {
        state.options === 'EDIT' && (
          <div style={{ marginTop: '16px', position: 'relative' }}>
            {state.isSubmitting && <FormLoader />}
            <form className={css.form} ref={editFormRef} onSubmit={editInfoFormHandler}>
              <FormControl variant="outlined" size="small">
                <OutlinedInput
                  placeholder="Enter your name"
                  defaultValue={user.name}
                  onBlur={nameValidator}
                  inputRef={nameFieldRef}
                  startAdornment={
                    <InputAdornment position="start">
                      <UserIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined" size="small">
                <OutlinedInput
                  placeholder="Enter your email"
                  type="email"
                  defaultValue={user.email}
                  onBlur={emailValidator}
                  inputRef={emailFieldRef}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className={css.formBtnContainer}>
                <Btn.Secondary label="Clear" onClick={() => editFormRef.current?.reset()} />
                <Btn.Primary label="Edit" type="submit" />
              </div>
            </form>
          </div>
        )
      }
    </Card>
  )

  const tabOne = (
    <Card title="Profile">
      <div className={css.detailsContainer}>
        <div>
          <Typography variant="body2" color="textSecondary">
            Name
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.name}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Employee ID
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.employeeId}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Designation
          </Typography>
          <Typography variant="h6" color="secondary">
            {desigantion[user.designation]}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Email
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.email}
          </Typography>
        </div>
      </div>
    </Card>
  )

  return (
    <>
    <Profile
      variant="temporary"
      anchor="right"
      open={isProfileOpen}
        onClose={closeProfileHandler}

    >
      <div className={css.root} >
        <span className={css.bg} />
        <div className={css.container}>
            <IconButton edge="start" aria-label="close-profile" onClick={closeProfileHandler}>
            <CloseIcon />
          </IconButton>
          <div className={css.profileCont}>
            <div>
              <Typography variant="h6" component="h4" color="secondary">
                {user.name}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {user.employeeId}
              </Typography>
            </div>
            <Avatar className={css.profilAvatar}>
              <UserIcon />
            </Avatar>
          </div>
          <TabContext
            value={value}
          >
            <AppBar position="static" color="transparent" className={css.appBar}>
              <TabList onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Personal" value="1" />
                <Tab label="" disabled className={css.fix} />
                <Tab label="Person" value="2" />
              </TabList>
            </AppBar>
            <TabPanel value="1" style={{ padding: 0 }}>
              {tabOne}
              {options}
            </TabPanel>
            <TabPanel value="2">qwertwy</TabPanel>
          </TabContext>
        </div>
      </div>
    </Profile>
    </>
  );
}

export default ProfilePage;

const useCSS = makeStyles(({ breakpoints, palette, spacing }) => ({
  root: {
    width: '100vw',
    [breakpoints.up('sm')]: {
      width: 510
    }
  },
  bg: {
    position: 'absolute',
    display: 'grid',
    width: '100%',
    height: spacing(40),
    backgroundColor: palette.common.white,
    zIndex: -1,
  },
  container: {
    padding: spacing(2.5)
  },
  profileCont: {
    marginTop: spacing(1.5),
    marginBottom: spacing(5),
    '& h4': {
      fontSize: spacing(3.5)
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profilAvatar: {
    width: spacing(10),
    height: spacing(10),
    backgroundColor: palette.primary.main,
    '& svg': {
      color: palette.primary.contrastText,
      fontSize: spacing(5)
    }
  },
  appBar: { alignItems: 'center', boxShadow: 'none', marginBottom: spacing(2.5) },
  fix: {
    [breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  detailsContainer: {
    paddingLeft: 7,
    '& > div': {
      marginTop: spacing(1.5)
    }
  },
  form: {
    marginTop: spacing(1.25),
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: spacing(1.5)
    }
  },
  formBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(1),
    '& > *': {
      marginLeft: spacing(2)
    }
  }
}))