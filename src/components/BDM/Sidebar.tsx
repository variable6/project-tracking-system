import Sidebar, { useStyles } from "../Sidebar";
import { ReactNode } from 'react'
import {
  NavLink
} from 'react-router-dom'
import {
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon,
  FiServer as ProjectIcon,
  FiCode as TaskIcon
} from 'react-icons/fi'
import { v4 as key } from 'uuid'


const navLinks: { label: string, path: string, icon: ReactNode }[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />
  }, {
    label: 'Projects',
    path: '/projects',
    icon: <ProjectIcon />
  }, {
    label: 'Employees',
    path: '/employees',
    icon: <EmployeesIcon />
  }, {
    icon: <TaskIcon />,
    label: 'Todos',
    path: '/todos'
  }
]


const SidebarBDM = () => {

  const css = useStyles()

  return (
    <Sidebar
      mobileNavbar={navLinks}
    >
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

export default SidebarBDM;