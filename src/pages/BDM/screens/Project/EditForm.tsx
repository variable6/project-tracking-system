import {
  Drawer,
  FormControl,
  MenuItem,
  Select,
  withStyles, Typography
} from '@material-ui/core'
import { FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as setKey } from 'uuid'
import Card from '../../../../components/Card'
import { useCSS } from './ProjectForm'
import useFormField from './../../../../hooks/useFormField'
import Button from '../../../../components/Button'
import Input from '../../../../components/InputField'

import { ProjectType2, EmployeeType } from '../../../../types'
import axiosConfig from '../../../../config/axiosConfig'
import moment from 'moment'

/// PropsType
interface PropsType {
  isOpen: boolean
  clearCurProject: () => void
  curProject: ProjectType2 | null
  employees: EmployeeType[]
}

const Slide = withStyles(({ palette, spacing, breakpoints }) => ({
  paper: {
    backgroundColor: palette.background.default,
    width: spacing(70),
    display: 'grid',
    placeItems: 'center',
    padding: spacing(2),
    [breakpoints.down(spacing(71))]: {
      width: '100vw'
    }
  }
}))(Drawer)



const EditForm = ({ isOpen, clearCurProject, curProject, employees }: PropsType) => {

  const css = useCSS()
  const history = useHistory()

  const titleField = useFormField(curProject?.projectTitle ? curProject.projectTitle : '')
  const descField = useFormField(curProject?.projectDesc ? curProject.projectDesc : '')
  const managerField = useFormField(curProject?.manager_id ? curProject.manager_id : '')
  const startDateField = useFormField('')
  const endDateField = useFormField('')

  const closeHandler = () => {
    clearCurProject()
  }

  useEffect(() => {
    const current = history.location.pathname
    window.onpopstate = () => {
      if (isOpen) {
        closeHandler()
        history.replace(current)
      }
    }
  }, [isOpen])

  const getDate = (date: string | Date | undefined | null) => {
    if (date === null || date === undefined)
      return 'No End Date'
    return moment(date).format('MMM DD, YYYY')
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()

    let updatedProject: any = {
      startDate: startDateField.value ? new Date(startDateField.value) : curProject?.startDate,
      endDate: endDateField.value ? new Date(endDateField.value) : curProject?.endDate
    }

    if (titleField.value !== curProject?.projectTitle)
      updatedProject.projectTitle = titleField.value

    if (descField.value !== curProject?.projectDesc)
      updatedProject.projectDesc = descField.value

    if (managerField.value !== curProject?.manager_id)
      updatedProject.managerId = managerField.value

    console.log(updatedProject)

    axiosConfig()
      .post('/bdm/project/update', updatedProject)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Slide open={isOpen} anchor="right" onClose={closeHandler}>
      <Card title="Edit Project">
        <form className={css.form} onSubmit={submitHandler}>
          <Input
            label="Project Title"
            value={titleField.value}
            onChange={titleField.onChange}
          />
          <Input
            label="Project Description"
            multiline={true}
            {...descField}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="project-manager">Project Manager</label>
            <FormControl variant="outlined" size="small">
              <Select id="project-manager"
                value={managerField.value}
                onChange={managerField.onChange}
              >
                {
                  employees.map(emp => (
                    <MenuItem key={setKey()} value={emp._id}>{emp.name} - {emp.employeeId}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <FormControl variant="outlined">
            <Typography variant="body1" color="textPrimary">
              Start Date: <strong>{getDate(curProject?.startDate)}</strong>
            </Typography>
            <Input
              type="date"
              {...startDateField}
            />
          </FormControl>
          <FormControl variant="outlined">
            <Typography variant="body1" color="textPrimary">
              End Date: <strong>{getDate(curProject?.endDate)}</strong>
            </Typography>
            <Input
              type="date"
              {...endDateField}
            />
          </FormControl>
          <Button.Secondary label="Cancel" />
          <Button.Primary label="Edit" type="submit" />
        </form>
      </Card>
    </Slide>
  )
}

export default EditForm