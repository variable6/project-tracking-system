import {
  Drawer,
  withStyles,
  TextField,
  makeStyles,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core'
import {
  useRef,
  useState, useContext, useEffect
} from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as setKey } from 'uuid'
import { FiChevronRight as BackIcon } from 'react-icons/fi'

import {
  EmployeeType
} from '../../../../types'

import { Autocomplete } from '@material-ui/lab'
import FormLoader from '../../../../components/FormLoader'
import Button from '../../../../components/Button'
import axiosConfig from '../../../../config/axiosConfig'
import { AlertContext } from '../../../../context/AlertContext'



const FormContainer = withStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up(600)]: {
      backdropFilter: 'blur(5px)'
    }
  }
}))(Drawer)


// props types 
interface PropsTypes {
  isOpen: boolean
  toggleForm: () => void
  employees: EmployeeType[]
  fetchProjects: () => void
}


const ProjectForm = ({ isOpen, toggleForm, employees, fetchProjects }: PropsTypes) => {

  const css = useCSS()
  const history = useHistory()

  const projectTitle = useRef<HTMLInputElement>(null)
  const projectDesc = useRef<HTMLInputElement>(null)
  const managerId = useRef<HTMLInputElement>(null)
  const startDate = useRef<HTMLInputElement>(null)
  const endDate = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)


  const { openAlert } = useContext(AlertContext)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const options = employees.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })

  const secBtnHandler = () => {
    formRef.current?.reset()
  }
  const closeForm = () => {
    toggleForm()
    secBtnHandler()
  }
  // getting manager 
  const getManager = () => {
    if (managerId.current?.value) {
      const empId = managerId.current?.value.split('-')[1].trim()
      const projectManager = employees.filter(emp => emp.employeeId === empId)
      return projectManager[0]._id
    } else {
      return null
    }
  }

  // generating project id
  const generateId = () => {

    const randomKey = setKey().split('-')[1].trim()
    const projectName = (projectTitle.current?.value)?.split(' ')

    if (projectName && projectName?.length >= 2)
      return (projectName[0][0] + projectName[1][0] + randomKey).toUpperCase()
    else if (projectName)
      return (projectName[0].substr(0, 2) + randomKey).toUpperCase()
    else
      return null
  }


  useEffect(() => {
    const current = history.location.pathname
    window.onpopstate = () => {
      if (isOpen) {
        closeForm()
        history.replace(current)
      }
    }
  }, [isOpen])

  const submitHandler = (e: any) => {
    e.preventDefault()

    if (!navigator.onLine) return null
    
    const sdate = startDate.current?.value ? new Date(startDate.current?.value) : null
    const edate = endDate.current?.value ? new Date(endDate.current?.value) : null
    const projectManagerID = getManager()
    const projectId = generateId()
    const title = projectTitle.current?.value
    const desc = projectDesc.current?.value

    const data = (sdate && edate) ? {
      projectId,
      projectTitle: title,
      projectDesc: desc,
      managerId: projectManagerID,
      startDate: sdate,
      endDate: edate
    } : ((sdate) ? {
      projectId,
      projectTitle: title,
      projectDesc: desc,
      managerId: projectManagerID,
      startDate: sdate
    } : {
      projectId,
      projectTitle: title,
      projectDesc: desc,
      managerId: projectManagerID
    })

    axiosConfig()
      .post('/bdm/project/add', data)
      .then(({ data }) => {
        setIsSubmitting(false)
        formRef.current?.reset()
        toggleForm()
        openAlert({
          message: data.message,
          type: data.message
        })
        fetchProjects()
      })
      .catch(e => {
        if (e.response.data) {
          const data = e.response.data
          openAlert({
            message: data.message,
            type: data.message
          })
        } else {
          openAlert({
            message: 'Something went worng',
            type: 'error'
          })
        }
      })

  }

  return (
    <FormContainer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={closeForm}
    >
      <div className={css.formCont}>
        {isSubmitting && <FormLoader />}
        <Typography variant="h4" color="textPrimary" className={css.title}>
          <IconButton edge="start" aria-label="Close" onClick={closeForm}>
            <BackIcon />
          </IconButton>
          &nbsp;Add Project
        </Typography>
        <div className={css.divider} />
        <Divider />
        <div className={css.divider} />
        <form
          className={css.form}
          onSubmit={submitHandler}
          ref={formRef}
        >
          <TextField required
            variant="outlined"
            color="secondary"
            size="small"
            name="projectTitle"
            inputRef={projectTitle}
            label="Project Title"
          />
          <TextField multiline
            required
            variant="outlined"
            color="secondary"
            size="small"
            rows={5}
            rowsMax={10}
            name="projectDesc"
            inputRef={projectDesc}
            label="Project Description"
          />
          <Autocomplete size="small"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => `${option.name} - ${option.employeeId}`}
            renderInput={(params) => (
              <TextField {...params} label="Project Manager" color="secondary" inputRef={managerId} variant="outlined" />
            )}
          />
          <div className={css.date}>
            <label >Start Date</label>
            <TextField
              variant="outlined"
              size="small"
              type="date"
              name="startDate"
              inputRef={startDate}
            />
          </div>
          <div className={css.date}>
            <label >End Date</label>
            <TextField
              variant="outlined"
              size="small"
              type="date"
              name="startDate"
              inputRef={endDate}
            />
          </div>
          <Divider />
          <div className={css.btnContainer}>
            <Button.Secondary label="Clear" type="reset" onClick={secBtnHandler} />
            <div className={css.btnFix} />
            <Button.Primary label="Add" type="submit" />
          </div>
        </form>
      </div>
    </FormContainer>
  );
}


const useCSS = makeStyles(({ spacing, breakpoints }) => ({
  formCont: {
    width: spacing(70),
    position: 'relative',
    padding: spacing(2),
    [breakpoints.down(spacing(70))]: {
      width: '100vw'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(1),
    '& > *': {
      marginBottom: spacing(2)
    }
  },
  divider: {
    marginTop: spacing(1.5),
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  btnFix: {
    width: spacing(2)
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  date: {
    display: 'flex', flexDirection: 'column', gap: 5,
    '&:focus-within > label': {
      fontWeight: 600
    }
  }
}))

export { useCSS }

export default ProjectForm
