import {
  Drawer,
  FormControl,
  MenuItem,
  Select,
  withStyles
} from '@material-ui/core'
import {
  FormEvent
} from 'react'
import { v4 as setKey } from 'uuid'
import Card from '../../../../components/Card'
import { useCSS } from './ProjectForm'
import useFormField from './../../../../hooks/useFormField'
import Button from '../../../../components/Button'
import Input from '../../../../components/InputField'

import { ProjectType2, EmployeeType } from '../../../../types'

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

  const titleField = useFormField(curProject?.projectTitle ? curProject.projectTitle : '')
  const descField = useFormField(curProject?.projectDesc ? curProject.projectDesc : '')
  const managerField = useFormField(curProject?.manager_id ? curProject.manager_id : '')

  const closeHandler = () => {
    clearCurProject()
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    console.log(titleField.value, descField.value)
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
                    <MenuItem key={setKey()} value={emp._id}>{emp.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <Button.Primary label="Edit" type="submit" />
        </form>
      </Card>
    </Slide>
  )
}

export default EditForm