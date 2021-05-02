import {
  Switch,
  Route
} from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import {
  FiGrid as DashboardIcon,
  FiCode as ProjectIcon,
  FiTerminal as TaskIcon,
  FiUser as AvatarIcon
} from 'react-icons/fi'
import { Avatar, makeStyles, fade } from '@material-ui/core'

// importing pages
import PageNotFound from '../PageNotFound';
import Dashboard from './screens/Dashboard';
import ProjectPage from './screens/ProjectPage';
import ProfilePage from './screens/ProjectPage';

// importing Types 
import { RouteListType } from '../../types'
import TaskPage from './screens/TaskPage';

const ProfileIcon = () => {

  const css = useCSS()

  return (
    <Avatar className={css.avatar}><AvatarIcon /></Avatar>
  )
}


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
    icon: <ProfileIcon />,
    label: 'Profile',
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

const useCSS = makeStyles(({ palette }) => ({
  avatar: {
    backgroundColor: fade(palette.text.hint, 0.15),
    '& svg': {
      color: palette.primary.contrastText
    }
  }
}))