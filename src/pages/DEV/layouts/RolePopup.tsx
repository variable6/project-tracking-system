import {
  Drawer, FormControlLabel, makeStyles, Radio, RadioGroup, withStyles
} from '@material-ui/core'
import { useContext, FormEvent } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import useFormField from '../../../hooks/useFormField';
import { DataContext } from '../DataContext';

const Model = withStyles(() => ({
  root: {
    display: ', TextFieldgrid',
    placeItems: 'center',
  },
  paper: {
    height: '100vh',
    marginBottom: 'auto',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)'
  }
}))(Drawer)

const RolePopup = () => {

  const { data, dispatch } = useContext(DataContext)
  const css = useCSS()
  const roleField = useFormField(data.role)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const val = roleField.value
    if (val === 'PM')
      dispatch.setRole('PM')
    else if (val === 'TL')
      dispatch.setRole('TL')
    else if (val === 'DEV')
      dispatch.setRole('DEV')
    dispatch.closeRoleModal()
  }

  return (
    <Model
      variant="temporary"
      open={data.showRolePopup}
      anchor="bottom"
    >
      <section id="show-roles-modal" className={css.container}>
        <div className={css.modal}>
          <Card title="Select your role" >
            <form className={css.form} onSubmit={onSubmit}>
              <RadioGroup aria-label="role" name="role" {...roleField}>
                <FormControlLabel value="DEV" control={<Radio />} label="Software Developer" />
                {data.roleList.isTL && <FormControlLabel value="TL" control={<Radio />} label="Team Leader" />}
                {data.roleList.isPM && <FormControlLabel value="PM" control={<Radio />} label="Project Manager" />}
              </RadioGroup>
              <Button.Primary type="submit" label="Done" />
            </form>
          </Card>
        </div>
      </section>
    </Model>
  );
}

export default RolePopup;


const useCSS = makeStyles(({ spacing, breakpoints }) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    [breakpoints.up('sm')]: {
      alignItems: 'center',
      bacKdropFilter: 'blur(5px)'
    }
  },
  modal: {
    width: spacing(60),
    [breakpoints.down(spacing(60.01))]: {
      width: '95vw'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2)
  }
}))