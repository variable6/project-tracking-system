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
import Sidebar, { useStyles as useCSS } from '../Sidebar'

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