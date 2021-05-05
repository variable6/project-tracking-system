import {
  Switch,
  Route
} from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import {
  FiHome as DashboardIcon,
  FiServer as ProjectIcon,
  FiCheckSquare as TaskIcon,
  FiUser as AvatarIcon
} from 'react-icons/fi'
import { Avatar, makeStyles, fade } from '@material-ui/core'

// importing pages
import PageNotFound from '../PageNotFound';
import Dashboard from './screens/Dashboard';
import ProjectPage from './screens/ProjectPage/index';
import ProfilePage from './screens/ProfileScreen';
import ProjectDetails from './screens/ProjectPage/ProjectDetails'

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
    component: (params) => <Dashboard {...params} />,
    icon: <DashboardIcon />,
    label: 'Dashboard',
    isInBottomNav: true
  }, {
    path: '/tasks',
    component: (params) => <TaskPage {...params} />,
    icon: <TaskIcon />,
    label: 'Tasks',
    isInBottomNav: true
  }, {
    path: '/projects',
    component: (params) => <ProjectPage {...params} />,
    icon: <ProjectIcon />,
    label: 'Projects',
    isInBottomNav: true
  }, {
    path: '/profile',
    component: (params) => <ProfilePage {...params} />,
    icon: <ProfileIcon />,
    label: 'Profile',
    isInBottomNav: false
  }, {
    path: '/projects/:projectId',
    component: (params) => <ProjectDetails {...params} />,
    icon: <ProjectIcon />,
    label: 'Project details',
    isInBottomNav: false
  }
]

export const tlRoutes: RouteListType[] = [
  {
    path: '/',
    component: (params) => <Dashboard />,
    icon: <DashboardIcon />,
    label: 'Dashboard',
    isInBottomNav: true
  }, {
    path: '/profile',
    component: (params) => <ProfilePage />,
    icon: <ProfileIcon />,
    label: 'Profile',
    isInBottomNav: false
  }
]

export const devRoutes: RouteListType[] = [
  {
    path: '/',
    component: (params) => <Dashboard {...params} />,
    icon: <DashboardIcon />,
    label: 'Dashboard',
    isInBottomNav: true
  }, {
    path: '/profile',
    component: (params) => <ProfilePage {...params} />,
    icon: <ProfileIcon />,
    label: 'Profile',
    isInBottomNav: false
  }
]


const Routes = () => (
  <Switch>
    {
      pmRoutes.map(route => (
        <Route key={uuid()} path={route.path}
          render={(props) => route.component(props)} exact
        />
      ))
    }
    <Route path="*" render={() => <PageNotFound />} />
  </Switch>
)

export default Routes;

const useCSS = makeStyles(({ palette }) => ({
  avatar: {
    backgroundColor: fade(palette.text.hint, 0.15),
    '& svg': {
      color: palette.primary.contrastText
    }
  }
}))