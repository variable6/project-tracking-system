import { TextField } from '@material-ui/core'
const Input = (props: {
  label?: string
  value?: string
  onChange?: (...args: any) => any
  required?: boolean
  multiline?: boolean
  ref?: any
  type?: string
}) => (
  <TextField
    type={props.type}
    multiline={props.multiline}
    required={props.required}
    label={props.label}
    variant="outlined"
    size="small"
    value={props.value}
    onChange={props.onChange}
    inputRef={props.ref}
    color={props.label ? 'secondary' : 'primary'}
    rows={props.multiline ? 7 : ''}
    rowsMax={props.multiline ? 16 : ''}
  />
)

export default Input