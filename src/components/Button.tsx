import { Button as Btn, makeStyles, fade } from '@material-ui/core'
import { ReactNode } from 'react';

//type
interface Props {
  label: string | ReactNode
  onClick?: (...args: any) => any
  type?: "button" | "submit" | "reset"
  className?: string
}

const Primary = ({ label, onClick, type, className }: Props) => {
  return (
    <Btn
      disableElevation
      variant="contained"
      color="primary"
      style={{ fontWeight: 600 }}
      onClick={onClick}
      type={type ? type : 'button'}
      className={`${useCSS().primary} ${className}`}
    >
      {label}
    </Btn>
  );
}

const Secondary = ({ label, onClick }: Props) => {
  return (
    <Btn variant="text" color="secondary" className={useCSS().secondary} onClick={onClick} style={{ fontWeight: 600 }} >
      {label}
    </Btn>
  )
}

const Button = { Primary, Secondary }

export default Button


const useCSS = makeStyles(({ palette }) => ({
  secondary: {
    backgroundColor: fade(palette.secondary.light, 0.09),
    '&:hover': {
      backgroundColor: fade(palette.secondary.light, 0.12)
    }
  },
  primary: {
    '&:hover': {
      backgroundColor: fade(palette.primary.main, 0.9)
    }
  }
}))