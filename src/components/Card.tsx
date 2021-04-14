import { ReactNode } from 'react'
import {
  Paper,
  makeStyles,
  Typography
} from '@material-ui/core'

// styles
const useCSS = makeStyles(theme => ({
  paper: {
    width: '100%',
    overflow: 'auto',
    padding: theme.spacing(1.25),
    filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.25),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  titleContainer: {
    display: 'flex',
    marginBottom: theme.spacing(1.85),
    marginTop: theme.spacing(1.5)
  },
  span: {
    width: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main
  }
}))

//PropTypes
interface PropTypes {
  children: ReactNode,
  title?: string
}

const Card = ({ children, title }: PropTypes) => {

  const css = useCSS()

  return (
    <Paper elevation={0} className={css.paper}>
      {
        title ? (
          <div className={css.titleContainer}>
            <span className={css.span} />
            <Typography
              variant="h6"
              color="secondary"
              style={{ fontWeight: 600 }}
            >
              &nbsp;&nbsp;&nbsp;{title}
            </Typography>
          </div>
        ) : null
      }
      <div>
        {children}
      </div>
    </Paper>
  )
}

export default Card