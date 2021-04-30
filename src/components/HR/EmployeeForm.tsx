import {
  Drawer,
  withStyles,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  makeStyles,
  Typography,
  CardActionArea,
  Avatar,
  useMediaQuery,
  useTheme,
  Fab,
  IconButton,
} from '@material-ui/core'
import {
  FiPlus as AddIcon,
  FiX as CloseIcon
} from 'react-icons/fi'
import React, { useState } from 'react'
import {
  ValidatorForm,
  TextValidator
} from 'react-material-ui-form-validator'
//importing components
import Button from '../Button'
// importing configs
import axioxConfig from '../../config/axiosConfig'
// import context
import { AlertContext } from '../../context/AlertContext'
// importing constants
import shadow from '../../constants/backgroundShadow'
import isName from '../../constants/isName'
import isID from '../../constants/isID'
import FormLoader from '../FormLoader'
import {
  EmployeeType
} from '../../types'
//styles
const Form = withStyles(({ spacing, breakpoints, palette }) => ({
  root: {
    [breakpoints.up('sm')]: {
      backdropFilter: `blur(${spacing(0.5)}px)`,
    }
  },
  paper: {
    width: 'max(30vw,540px)',
    backgroundColor: palette.background.default,
    [breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))(Drawer)
const useCSS = makeStyles(({ spacing, palette, shape, breakpoints, mixins }) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: `auto ${spacing(2)}px`,
    backgroundColor: palette.background.paper,
    borderRadius: shape.borderRadius,
    filter: shadow,
    '& h4': {
      marginBottom: spacing(3)
    },
    '& section': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing(2),
      marginTop: spacing(2),
    },
    overflow: 'hidden',
    position: 'relative'
  },
  input: {
    width: '100%',
    marginBottom: spacing(1.5),
    marginTop: spacing(1.75)
  },
  titleContainer: {
    display: 'flex',
    marginBottom: spacing(1),
    marginTop: spacing(1)
  },
  span: {
    width: spacing(0.5),
    borderRadius: spacing(0.5),
    backgroundColor: palette.primary.main
  },
  card: {
    width: '100%',
    overflow: 'auto',
    filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))',
    marginTop: spacing(3),
    marginBottom: spacing(1.25),
    [breakpoints.down('sm')]: {
      marginTop: spacing(2)
    },
    backgroundColor: palette.background.paper,
    borderRadius: shape.borderRadius
  },
  cardBtn: {
    padding: spacing(1.25),
    borderRadius: shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconContainer: {
    backgroundColor: palette.primary.main,
    marginRight: spacing(0.5),
    '& svg': {
      color: palette.secondary.main
    }
  },
  fab: {
    zIndex: 999,
    position: 'fixed',
    bottom: mixins.toolbar.minHeight,
    marginBottom: spacing(2.5),
    right: spacing(2.5),
    backgroundColor: palette.primary.main,
    color: palette.secondary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: palette.primary.dark
    },
    boxShadow: 'none',
    filter: 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25))'
  },
  closeIcon: {
    backgroundColor: palette.common.white,
    marginRight: spacing(1.5),
    '& svg': {
      color: palette.secondary.main
    }
  },
  formContainer: {
    padding: spacing(2)
  }
}))

// Types
interface PropsType {
  open: boolean,
  curEmp: EmployeeType,
  toggleForm: () => any,
  curEmpHandler: {
    add: (val: EmployeeType) => any,
    clear: () => any
  },
  fetchEmployees: () => void
}
const EmployeeForm = ({ open, toggleForm, curEmp, curEmpHandler, fetchEmployees }: PropsType) => {

  const css = useCSS()
  const isSM = useMediaQuery(useTheme().breakpoints.down('sm'))
  const isXS = useMediaQuery(useTheme().breakpoints.down('xs'))
  const [isSubmiting, setIsSubmiting] = React.useState(false)

  const { openAlert } = React.useContext(AlertContext)

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    toggleForm()
    curEmpHandler.clear()
  }

  const initInput = {
    name: '',
    designation: 'DEV',
    email: '',
    employeeId: ''
  }
  const [formInputs, setFormInputs] = useState(initInput)

  React.useEffect(() => {

    ValidatorForm.addValidationRule('isName', value => isName(value))
    ValidatorForm.addValidationRule('isID', value => isID(value))

    return () => {
      ValidatorForm.removeValidationRule('isName')
      ValidatorForm.removeValidationRule('isID')
    }

  }, [])

  React.useEffect(() => {
    if (curEmp.employeeId) {
      setFormInputs({
        name: curEmp.name,
        designation: curEmp.designation,
        email: curEmp.email,
        employeeId: curEmp.employeeId
      })
    }
    else {
      setFormInputs({
        name: '',
        designation: 'DEV',
        email: '',
        employeeId: ''
      })
    }
  }, [curEmp])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormInputs(cur => ({
      ...cur,
      [name]: value
    }))
  }

  const submitHandler = (e: React.FormEvent<Element>) => {
    e.preventDefault()
    setIsSubmiting(true)
    if (curEmp._id) {
      axioxConfig()
        .post('hr/emp/update', {
          ...formInputs,
          employeeId: curEmp.employeeId
        })
        .then(({ data }) => {
          fetchEmployees()
          curEmpHandler.clear()
          toggleForm()
          setIsSubmiting(false)
          openAlert({
            message: data.message,
            type: 'message'
          })
        })
        .catch(e => {
          if (e.response && e.response.data) {
            const data = e.response.data
            setIsSubmiting(false)
            openAlert({
              message: data.message,
              type: data.type
            })
          } else {
            setIsSubmiting(false)
            openAlert({
              message: 'Something went wrong!',
              type: 'error'
            })
          }
          toggleForm()
        })
    } else {
      axioxConfig()
        .post('hr/emp/add', formInputs)
        .then(({ data }) => {
          fetchEmployees()
          curEmpHandler.clear()
          setIsSubmiting(false)
          openAlert({
            message: data.message,
            type: data.type
          })
          setFormInputs(initInput)
        })
        .catch(error => {
          if (error.response && error.response.data) {
            const data = error.response.data
            openAlert({
              message: data.message,
              type: data.type
            })
          }
          setIsSubmiting(false)
        })
    }
  }

  const AddEmp = () => isSM ? (
    <Fab
      variant="extended" aria-label="Add Employee"
      className={css.fab} onClick={() => { curEmpHandler.clear(); toggleForm() }}
    >
      <AddIcon />
      { isXS || <>&nbsp;&nbsp;Add Employee</>}
    </Fab>
  ) : (
    <div className={css.card}>
      <CardActionArea
        className={css.cardBtn}
        onClick={() => { curEmpHandler.clear(); toggleForm() }}
      >
        <div className={css.titleContainer}>
          <span className={css.span} />
          <Typography
            variant="h6"
            color="secondary"
            style={{ fontWeight: 600 }}
          >
            &nbsp;&nbsp;&nbsp;Add Employee
            </Typography>
        </div>
        <Avatar className={css.iconContainer}>
          <AddIcon />
        </Avatar>
      </CardActionArea>
    </div>
  )

  return (
    <>
      <AddEmp />
      <Form anchor="right" open={open} onClose={toggleDrawer()}>
        <ValidatorForm onSubmit={submitHandler} className={css.form} >
          {isSubmiting && <FormLoader />}
          <div className={css.formContainer}>
            <Typography variant="h4"
              style={{ display: 'flex', alignItems: 'center' }}
              component="h4" color="secondary"
            >
              <IconButton className={css.closeIcon}
                onClick={() => {
                  toggleForm();
                  setFormInputs(initInput);
                  curEmpHandler.clear();
                }}
              >
                <CloseIcon />
              </IconButton>
              {curEmp._id ? 'Edit ' : 'Add '}Employee
          </Typography>
            <TextValidator
              disabled={curEmp._id ? true : false}
              label="Employee ID"
              onChange={inputHandler}
              name="employeeId"
              value={formInputs.employeeId}
              validators={['required', 'isID']}
              errorMessages={['this field is required', 'ID is not valid']}
              variant="outlined"
              size='small'
              className={css.input}
              color="secondary"
            />
            <TextValidator
              label="Full Name"
              onChange={inputHandler}
              name="name"
              value={formInputs.name}
              validators={['required', 'isName']}
              errorMessages={['this field is required', 'Name is not valid']}
              variant="outlined"
              size='small'
              className={css.input}
              color="secondary"
            />
            <TextValidator
              label="Email ID"
              onChange={inputHandler}
              name="email"
              value={formInputs.email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'Email is not valid']}
              variant="outlined"
              size='small'
              className={css.input}
              color="secondary"
            />
            <FormControl style={{ marginTop: 10 }} component="fieldset" color="secondary">
              <FormLabel component="legend">Designation</FormLabel>
              <RadioGroup
                aria-label="designation"
                value={formInputs.designation}
                name="designation"
                onChange={inputHandler}
              >
                <FormControlLabel value="DEV" control={<Radio />} label="Developer" />
                <FormControlLabel value="HR" control={<Radio />} label="Human Resource Manager" />
                <FormControlLabel value="BDM" control={<Radio />} label="Business Development Manager" />
              </RadioGroup>
            </FormControl>
            <section>
              <Button.Secondary
                label={curEmp._id ? 'close' : 'clear'}
                onClick={() => {
                  if (curEmp._id) {
                    toggleForm();
                    setFormInputs(initInput);
                    curEmpHandler.clear();
                  } else {
                    setFormInputs(initInput);
                  }
                }}
              />
              <Button.Primary
                label={curEmp._id ? 'edit' : 'add'} onClick={() => null}
                type="submit"
              />
            </section>
          </div>
        </ValidatorForm>
        <span style={{ marginTop: 'auto', marginBottom: 'auto' }} />
      </Form>
    </>
  )
}

export default EmployeeForm;

