import { Button as Btn } from '@material-ui/core'

//type
interface Props {
  label: string
  onClick: (...args: any) => any
  type?: "button" | "submit" | "reset"
}

const Primary = ({ label, onClick, type }: Props) => {
  return (
    <Btn
      disableElevation
      variant="contained"
      color="primary"
      style={{ fontWeight: 600 }}
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {label}
    </Btn>
  );
}

const Secondary = ({ label, onClick }: Props) => {
  return (
    <Btn variant="text" color="secondary" onClick={onClick} style={{ fontWeight: 600 }} >
      {label}
    </Btn>
  )
}

const Button = { Primary, Secondary }

export default Button