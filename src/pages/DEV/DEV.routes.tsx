import {
  Switch,
  Route
} from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import {
  FiGrid as DashboardIcon,
  FiCode as ProjectIcon,
  FiTerminal as TaskIcon
} from 'react-icons/fi'

// importing pages
import PageNotFound from '../PageNotFound';
import Dashboard from './screens/Dashboard';
import ProjectPage from './screens/ProjectPage';
import ProfilePage from './screens/ProjectPage';

// importing Types 
import { RouteListType } from '../../types'
import TaskPage from './screens/TaskPage';


export const pmRoutes: RouteListType[] = [
  {
    path: '/',
    component: <Dashboard />,
    icon: <DashboardIcon />,
    label: 'Dashboard',
    isInBottomNav: true
  }, {
    path: '/tasks',
    component: <TaskPage />,
    icon: <TaskIcon />,
    label: 'Tasks',
    isInBottomNav: true
  }, {
    path: '/projects',
    component: <ProjectPage />,
    icon: <ProjectIcon />,
    label: 'Dashboard',
    isInBottomNav: true
  }, {
    path: '/profile',
    component: <ProfilePage />,
    icon: <ProjectIcon />,
    label: 'Dashboard',
    isInBottomNav: false
  }
]


const PMroutes = () => {
  return (
    <Switch>
      {
        pmRoutes.map(route => (
          <Route key={uuid()} path={route.path}
            render={() => route.component} exact
          />
        ))
      }
      <Route path="*" render={() => <PageNotFound />} />
    </Switch>
  );
}

export default PMroutes;