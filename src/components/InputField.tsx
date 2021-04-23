import { TextField } from '@material-ui/core'
const Input = (props: {
  label: string,
  value: string,
  onChange: (...args: any) => any,
  required?: boolean,
  multiline?: boolean
}) => (
  <TextField
    multiline={props.multiline}
    required={props.required}
    label={props.label}
    variant="outlined"
    size="small"
    value={props.value}
    onChange={props.onChange}
  />
)

export default Input