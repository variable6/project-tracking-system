import { ReactNode } from 'react'
import {
  Paper,
  makeStyles,
  Typography,
  ButtonGroup,
  IconButton
} from '@material-ui/core'
import { v4 as getKey } from 'uuid'

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
    marginTop: theme.spacing(1.5),
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    '& h4': {
      flex: '1',
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(25),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  },
  span: {
    width: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main
  },
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnGroup: {
    borderRadius: theme.spacing(999)
  },
  iconBtn: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.9),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1.2)}px`
  }
}))

interface OptionType {
  label: string,
  icon: ReactNode,
  onClick: (...args: any[]) => void
}

//PropTypes
interface PropTypes {
  children: ReactNode,
  title?: string
  marginTop?: number | string,
  noshadow?: boolean
  options?: OptionType[],
  menu?: ReactNode
}

const Card = ({ children, title, marginTop, menu, noshadow, options }: PropTypes) => {

  const css = useCSS()

  const filter = noshadow ? 'none' : ''


  return (
    <Paper elevation={0} className={css.paper} style={marginTop ? { marginTop, filter } : {}}>
      {
        title ? (
          <div className={css.headContainer}>
            <div className={css.titleContainer}>
              <span className={css.span} />
              <Typography
                variant="h6"
                component="h4"
                color="secondary"
              >
                &nbsp;&nbsp;&nbsp;{title}
              </Typography>
            </div>
            <div>
              {
                options ? (
                  <ButtonGroup variant="text" className={css.btnGroup} disableElevation aria-label="card options" >
                    {
                      options.map(opt => (
                        <IconButton key={getKey()}
                          aria-label={opt.label}
                          onClick={opt.onClick}
                          className={css.iconBtn}
                        >
                          {opt.icon}
                        </IconButton>
                      ))
                    }
                  </ButtonGroup>
                ) : (menu ? menu : null)
              }
            </div>
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