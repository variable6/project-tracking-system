import { Switch, Route } from "react-router";
import { ReactNode } from 'react'
import { v4 as uuid } from 'uuid'

// import screens
import Dashboard from "./screens/Dashboard";
import Employees from "./screens/Employees";
import PageNotFound from "../PageNotFound";

const routeList: { path: string, component: ReactNode }[] = [
  {
    path: '/',
    component: <Dashboard />
  }, {
    path: '/employees',
    component: <Employees />
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