import {
  Drawer,
  withStyles
} from '@material-ui/core'
import {
  FormEvent
} from 'react'
import Card from '../../../../components/Card'
import { useCSS } from './ProjectForm'
import useFormField from './../../../../hooks/useFormField'
import Button from '../../../../components/Button'
import Input from '../../../../components/InputField'


/// PropsType
interface PropsType {
  isOpen: boolean
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



const EditForm = ({ isOpen }: PropsType) => {

  const css = useCSS()

  const titleField = useFormField()
  const descField = useFormField()


  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    console.log(titleField.value, descField.value)
  }

  return (
    <Slide open={isOpen} anchor="right">
      <Card title="Edit Project">
        <form className={css.form} onSubmit={submitHandler}>
          <Input
            label="Project Title"
            {...titleField}
          />
          <Input
            label="Project Description"
            {...descField}
          />
          <Button.Primary label="Edit" type="submit" />
        </form>
      </Card>
    </Slide>
  )
}

export default EditForm