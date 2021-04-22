import {
  TextField,
  Drawer,
  withStyles
} from '@material-ui/core'
import {
  FormEvent
} from 'react'
import Card from '../../../../components/Card'
import { useCSS } from './ProjectForm'

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

const EditForm = () => {

  const css = useCSS()


  const submitHandler = (event: FormEvent) => {
    event.preventDefault()

  }

  return (
    <Slide open={true} anchor="right">
      <Card title="Edit Project">
        <form className={css.form} onSubmit={submitHandler}>
          <TextField />
        </form>
      </Card>
    </Slide>
  )
}

export default EditForm