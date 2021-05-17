import { ReactNode } from 'react'
import {
  NavLink
} from 'react-router-dom'
import {
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon,
  FiServer as ProjectsIcon
} from 'react-icons/fi'
import { v4 as key } from 'uuid'

// importing components
import Sidebar, { useStyles as useCSS } from '../Sidebar'


const navLinks: { label: string, path: string, icon: ReactNode }[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />
  }, {
    label: 'Employees',
    path: '/employees',
    icon: <EmployeesIcon />
  }, {
    label: 'Projects',
    path: '/projects',
    icon: <ProjectsIcon />
  }
]

const SidebarHR = () => {

  const css = useCSS()

  return (
    <Sidebar mobileNavbar={navLinks}>
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