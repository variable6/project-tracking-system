import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react'
import {
  NavLink
} from 'react-router-dom'
import {
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon
} from 'react-icons/fi'
import { v4 as key } from 'uuid'

// importing components
import Sidebar from '../Sidebar'

// Props types
interface Props {
  mobileOpen: boolean
  setMobileOpen: any
}

const navLinks: { label: string, path: string, icon: ReactNode }[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />
  }, {
    label: 'Employees',
    path: '/employees',
    icon: <EmployeesIcon />
  }
]

const SidebarHR = ({ mobileOpen, setMobileOpen }: Props) => {

  const css = useCSS()

  const mobileSidebar = (
    <div className={css.root}>
      {
        navLinks.map(link => (
          <NavLink onClick={e => {
            setMobileOpen()
          }} key={key()} to={link.path} exact
            className={css.link} activeClassName={css.active}>
            {link.icon}
            {link.label}
          </NavLink>
        ))
      }
    </div>
  )

  return (
    <Sidebar mobileSidebar={mobileSidebar}
      mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
      <div className={css.root}>{
        navLinks.map(link => (
          <NavLink key={key()} to={link.path} exact className={css.link} activeClassName={css.active}>
            {link.icon}
            {link.label}
          </NavLink>
        ))
      }</div>
    </Sidebar>
  );
}

export default SidebarHR;



const useCSS = makeStyles(({ spacing, palette, shape }) => ({
  root: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: spacing(2),
    marginRight: spacing(2),
    padding: spacing(1.25),
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius
  },
  link: {
    display: 'flex',
    padding: `${spacing(1)}px ${spacing(1.75)}px`,
    marginTop: spacing(1.25),
    marginBottom: spacing(1.25),
    fontSize: spacing(1.75),
    letterSpacing: 0.35,
    textTransform: 'uppercase',
    fontWeight: 500,
    textDecoration: 'none',
    borderRadius: shape.borderRadius,
    color: palette.primary.contrastText,
    alignItems: 'center',
    '& > svg': {
      fontSize: spacing(2.75),
      marginRight: spacing(1.25)
    }
  },
  active: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main
  }
}))