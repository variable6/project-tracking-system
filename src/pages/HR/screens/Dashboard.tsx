import * as React from 'react'
import {
  Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
//importing context
import { RouteContext } from '../../../context/RouteContext'
import { TodosCard } from '../../../components/TodoList'
// importing components


//component
const Dashboard = () => {

  const history = useHistory()
  const route = React.useContext(RouteContext)
  const pageName = 'Dashboard'

  React.useEffect(() => {
    route.setContext({
      ...route.context,
      pageTitle: pageName
    })
    document.title = `WorkSpace | PTS - ${pageName}`
  }, [])

  return (
    <>
      <Button onClick={() => history.push('/employees')}>employee</Button>
      <TodosCard />
    </>
  )
}

export default Dashboard