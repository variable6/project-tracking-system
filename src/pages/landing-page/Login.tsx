import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import clsx from 'clsx'
import {
  Drawer,
  InputAdornment,
  makeStyles, OutlinedInput,
  FormControl, Typography,
  FormControlLabel, Checkbox, Stepper, Step, StepLabel, StepContent,
  useMediaQuery, useTheme, IconButton
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  FiUser as UserIcon,
  FiKey as PwdIcon,
  FiChevronsRight as CLoseIcon
} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
//importing assets
// import Pattern from '../../assets/images/patternpad.svg'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import Pattern from '../../components/_pattern'
//importing from configs
import axios from '../../config/axiosConfig'
//import context
import { TokenContext } from '../../context/TokenContext'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/Loader'
import { StepIconProps } from '@material-ui/core/StepIcon'

const useCSS = makeStyles(({ palette, spacing, breakpoints }) => ({
  page: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  root: {
    backgroundColor: 'rgba(0,0,0,0.10)',
    [breakpoints.up('sm')]: {
      backdropFilter: 'blur(7px)'
    }
  },
  docked: {
    babackgroundColor: 'rgba(0,0,0,0.0)'
  },
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  img: {
    height: '100vh',
    userSelect: 'none',
    userDrag: 'none'
  },
  logo: {
    margin: `${spacing(2.5)}px ${spacing(3.5)}px`,
    width: spacing(35)
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    paddingTop: 'auto',
    paddingBottom: 'auto',
    transition: '250ms ease',
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  formContainer: {
    width: '30vw',
    minWidth: spacing(45),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [breakpoints.down(470)]: {
      width: '100vw',
      minWidth: spacing(15)
    },
    position: 'relative'
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing(2)
  },
  formCont: {
    marginTop: 'auto', marginBottom: 'auto'
  },
  title: {
    paddingLeft: spacing(3)
  },
  initial: {
    width: spacing(3.5),
    height: spacing(3.5),
    backgroundColor: palette.background.default,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    '& svg': {
      color: palette.primary.contrastText,
      fontSize: spacing(2.25)
    }
  },
  active: {
    backgroundColor: palette.primary.main,
    '& svg': {
      color: palette.primary.contrastText
    }
  },
  completed: {
    backgroundColor: palette.common.white,
    '& svg': {
      color: palette.primary.contrastText
    }
  }, alert: {
    marginLeft: spacing(3.5),
    marginRight: spacing(3.5)
  },
  closeIcon: {
    backgroundColor: palette.common.white,
    [breakpoints.up(470)]: {
      display: 'none'
    }
  }
}))

const Login = () => {

  const history = useHistory()

  const initState = {
    open: false,
    form: {
      employeeId: '',
      password: ''
    },
    showPwd: false,
    isSubmitting: false,
    isError: false,
    alert: ''
  }
  const [state, setState] = useState(initState)
  const [activeState, setActiveState] = useState(0)
  const { breakpoints } = useTheme()
  const isMD = useMediaQuery(breakpoints.down(870))

  const css = useCSS()

  const { setToken } = useContext(TokenContext)
  const { addUser } = useContext(AuthContext)

  const closeLogin = () => {
    if (!state.isSubmitting) {
      toggleDrawer()
      setState(initState)
      setActiveState(0)
    }
  }

  const Title = () => (
    <div className={css.title}>
      <IconButton onClick={closeLogin} className={css.closeIcon} >
        <CLoseIcon />
      </IconButton>
      <Typography variant="h3" color="secondary">
        <span style={{ fontWeight: 800, fontSize: 42 }}>
          Welcome Back!
        </span>
      </Typography>
      <Typography variant="h6" color="textPrimary">
        Please login to your account.
      </Typography>
    </div>
  )

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState(cur => ({
      ...cur,
      open: !state.open
    }))
  }

  const togglePwd = () => setState(cur => ({
    ...cur,
    showPwd: !cur.showPwd
  }))

  const formHandler1 = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setActiveState(c => c + 1)
  }
  const formHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setState(c => ({ ...c, isSubmitting: true }))
    setActiveState(c => c + 1)
    axios().post('/login', state.form)
      .then(({ data }) => {
        setToken(data.token)
        addUser(data.user)
      })
      .catch(e => {
        setState(c => ({
          ...c,
          isError: true,
          isSubmitting: false,
          alert: (e.response && e.response.data)
            ? e.response.data.message
            : 'Something went worng'
        }))
        console.log(e)
        for (let i in e) {
          console.log(i, e[i])
        }
      })
    setState(c => ({
      ...c,
      form: {
        ...c.form,
        password: ''
      }
    }))
  }

  //input handler
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setState(cur => ({
      ...cur,
      form: {
        ...cur.form,
        [id]: value
      }
    }))
  }

  function ColorlibStepIcon(props: StepIconProps) {
    const classes = useCSS();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <UserIcon />,
      2: <PwdIcon />,
    };

    return (
      <div
        className={clsx(classes.initial, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  useEffect(() => {
    window.onpopstate = () => {
      if (state.open) {
        closeLogin()
        history.replace('/')
      }
    }
  }, [state])

  const openLogin = () => {
    setState(cur => ({
      ...cur,
      open: !state.open
    }))
    history.push('/')
  }

  return (
    <>
      <button onClick={openLogin}>Login</button>
      <Drawer classes={{ paper: css.page, root: css.root, docked: css.docked }}
        anchor="right" variant="temporary"
        open={state.open}
        onClose={closeLogin}
      >
        <div className={css.container}>
          <div className={css.formContainer}>
            <div className={css.logo}>
              <Logo />
            </div>
            <div className={css.formCont}>
              <Title />
              <Stepper style={{ backgroundColor: '#fff' }}
                activeStep={activeState} orientation="vertical">
                <Step>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    Enter your id
                  </StepLabel>
                  <StepContent>
                    <form
                      className={css.form}
                      onSubmit={formHandler1}
                    >
                      <FormControl variant="outlined" size="small">
                        <OutlinedInput
                          required
                          id="employeeId"
                          startAdornment={
                            <InputAdornment position="start">
                              <UserIcon />
                            </InputAdornment>
                          }
                          value={state.form.employeeId}
                          onChange={inputHandler}
                        />
                      </FormControl>
                      <div className={css.btnContainer}>
                        <Button.Primary
                          type="submit"
                          label="Next&nbsp;&nbsp;&rarr;"
                          onClick={() => null}
                        />
                      </div>
                    </form>
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    Enter your password
                  </StepLabel>
                  <StepContent>
                    <form
                      className={css.form}
                      onSubmit={formHandler}
                    >
                      <FormControl variant="outlined" size="small">
                        <OutlinedInput
                          required autoFocus
                          placeholder="Enter your password"
                          id="password"
                          type={state.showPwd ? 'text' : 'password'}
                          startAdornment={
                            <InputAdornment position="start">
                              <PwdIcon />
                            </InputAdornment>
                          }
                          value={state.form.password}
                          onChange={inputHandler}
                        />
                      </FormControl>
                      <FormControlLabel
                        control={
                          <Checkbox checked={state.showPwd} onClick={togglePwd} color="primary" />
                        }
                        label="Show password"
                      />
                      <div className={css.btnContainer}>
                        <Button.Secondary
                          label="back"
                          onClick={() => setActiveState(c => c - 1)}
                        />
                        <Button.Primary
                          type="submit"
                          label="Login"
                          onClick={() => null}
                        />
                      </div>
                    </form>
                  </StepContent>
                </Step>
              </Stepper>
              {
                activeState === 2 && (
                  state.isSubmitting && (
                    <div className={css.title}><Loader /></div>
                  )
                )
              }
              {
                activeState === 2 && (
                  state.isError && (
                    <Alert
                      className={css.alert}
                      severity="error"
                      action={
                        <Button.Secondary
                          label="Try, again"
                          onClick={() => {
                            setActiveState(0)
                            setState(c => ({ ...c, isError: false }))
                          }}
                        />
                      }
                    >
                      {state.alert}
                    </Alert>
                  )
                )
              }
            </div>
            <span style={{ marginBottom: 'auto', marginTop: 'auto', display: 'block' }} />
          </div>
          {isMD || <div className={css.img}><Pattern /></div>}
        </div>
      </Drawer>
    </>
  )
}

export default Login