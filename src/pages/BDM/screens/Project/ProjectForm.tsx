import {
  Drawer,
  withStyles,
  TextField,
  makeStyles,
  Typography,
  Divider
} from '@material-ui/core'
import {
  useRef,
  useState, useContext
} from 'react'
import { v4 as setKey } from 'uuid'

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
  const projectTitle = useRef<HTMLInputElement>(null)
  const projectDesc = useRef<HTMLInputElement>(null)
  const managerId = useRef<HTMLInputElement>(null)
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

  const closeForm = () => {
    toggleForm()
  }

  const secBtnHandler = () => {
    formRef.current?.reset()
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

  const submitHandler = (e: any) => {
    e.preventDefault()

    setIsSubmitting(true)

    const projectManagerID = getManager()
    const projectId = generateId()
    const title = projectTitle.current?.value
    const desc = projectDesc.current?.value

    axiosConfig()
      .post('/bdm/project/add', {
        projectId,
        projectTitle: title,
        projectDesc: desc,
        managerId: projectManagerID
      })
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
        {/* <FormLoader /> */}
        <Typography variant="h4" color="textPrimary">
          Add Project
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

export default ProjectForm

const useCSS = makeStyles(({ spacing }) => ({
  formCont: {
    width: spacing(70),
    position: 'relative',
    padding: spacing(2)
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
  }
}))