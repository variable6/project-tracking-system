import {
  Breadcrumbs,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { FiChevronRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { v4 as key } from 'uuid'

//styles
const useCSS = makeStyles(theme => ({
  link: {
    colorr: theme.palette.text.secondary,
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: '250ms',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main
    }
  },
  breadcrumb: {
    marginBottom: theme.spacing(2.75)
  }
}))

// Props Type
interface LinkPropType {
  label: string
  path: string
}
interface PropsType {
  links: LinkPropType[],
  currentPage: string
}

const BreadCrumbs = ({ links, currentPage }: PropsType) => {

  const css = useCSS()
  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'))
  const history = useHistory()

  const separator = (<FiChevronRight fontSize="small" />)

  const Link = ({ path, label }: LinkPropType) => (
    <Typography
      variant="body1"
      className={css.link}
      onClick={() => history.replace(path)}
    >
      {label}
    </Typography>
  )

  if (isMobile) return null

  return (
    <Breadcrumbs className={css.breadcrumb} separator={separator} aria-label="breadcrumb">
      {
        links.map(link => (
          <Link key={key()} path={link.path} label={link.label} />
        ))
      }
      <Typography style={{ fontWeight: 600 }} color="secondary">{currentPage}</Typography>
    </Breadcrumbs>
  )
}
export default BreadCrumbs