import {
  Switch,
  Route
} from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// importing pages
import PageNotFound from '../PageNotFound';
import Dashboard from './screens/Dashboard';


const pmRoutes: { path: string, component: React.ReactNode }[] = [
  {
    path: '/',
    component: <Dashboard />
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