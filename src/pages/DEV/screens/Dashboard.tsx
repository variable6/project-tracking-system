import { useEffect, useContext } from 'react'
import PageContainer from '../layouts/PageContainer'
//import context
import { DataContext } from '../DataContext'
import { AuthContext } from '../../../context/AuthContext'
import useFetch from '../useFetch'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Paper } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const { data } = useContext(DataContext)
  const auth = useContext(AuthContext)

  const api = useFetch()

  useEffect(() => {
    document.title = `WorkSpace | ${data.role} - ${PAGENAME}`
    api.fetchRoles()
  }, [])
  
  return (
    <PageContainer>
      <AppBar position="relative" elevation={0} color="transparent">
        <Toolbar>
          <Typography variant="h5">
            {PAGENAME}
          </Typography>
          <button onClick={() => auth.logout()}>logout</button>
        </Toolbar>
      </AppBar>
      <GreetingCard />
      {data.role === 'PM' && <p>qwerty pm</p>}
      {data.role === 'DEV' && <p>qwerty DEV</p>}
      {data.roleList.isPM && <p>qwerty PM .</p>}
      {data.roleList.isTL && <p>qwerty TL.</p>}
      <TodosCard />
    </PageContainer>
  );
}



const GreetingCard = () => {

  const css = useGreetingCardCSS()

  return (
    <Paper elevation={0} className={css.root}>
    </Paper>
  )
}

export default Dashboard;


const useGreetingCardCSS = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  }
}))