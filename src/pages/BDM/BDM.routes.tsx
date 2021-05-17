import { Switch, Route } from "react-router";
import { ReactNode } from 'react'
import { v4 as uuid } from 'uuid'
import {
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon,
  FiServer as ProjectIcon,
  FiCode as TodoIcon
} from 'react-icons/fi'

// import screens
import Dashboard from "./screens/Dashboard";
import Employees from "./screens/Employees";
import Project from './screens/Project'
import PageNotFound from "../PageNotFound";
import { TodoScreen } from "../../components/TodoList";

const routeList: { path: string, component: ReactNode, icon: ReactNode }[] = [
  {
    path: '/',
    component: <Dashboard />,
    icon: <DashboardIcon />
  }, {
    path: '/employees',
    component: <Employees />,
    icon: <EmployeesIcon />
  }, {
    icon: <ProjectIcon />,
    component: <Project />,
    path: '/projects'
  }, {
    icon: <TodoIcon />,
    component: <TodoScreen />,
    path: '/todos'
  }
]


const BDMroutes = () => {
  return (
    <Switch>
      {
        routeList.map(route => (
          <Route key={uuid()}
            path={route.path} exact
            render={() => route.component}
          />
        ))
      }
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default BDMroutes;