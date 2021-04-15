import { Switch, Route } from 'react-router-dom'
import { v4 as key } from 'uuid'
import Dashboard from './screens/Dashboard'
import ErrorPage from '../PageNotFound'

//importing screens 
import Employee from './screens/Empolyee'
import Profile from './screens/Profile'


const routeList: { path: string, component: React.ReactNode }[] = [
  {
    path: '/',
    component: <Dashboard />
  }, {
    path: '/employees',
    component: <Employee />
  }, {
    path: '/profile',
    component: <Profile />
  }
]

const HRRoutes = () => {

  return (
    <Switch>
      {
        routeList.map(route => (
          <Route key={key()} exact path={route.path} render={() => route.component} />
        ))
      }
      <Route path="*" render={() => <ErrorPage />} />
    </Switch>
  )
}

export default HRRoutes