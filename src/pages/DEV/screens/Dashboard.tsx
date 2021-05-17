import { useEffect, useContext } from 'react'
import PageContainer from '../layouts/PageContainer'
//import context
import { DataContext } from '../DataContext'
import { AuthContext } from '../../../context/AuthContext'
import useFetch from '../useFetch'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Hidden, IconButton, makeStyles, Paper } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'
import { FiPower } from 'react-icons/fi'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const { data } = useContext(DataContext)
  const auth = useContext(AuthContext)

  const css = useCSS()

  const api = useFetch()

  useEffect(() => {
    document.title = `WorkSpace | ${data.role} - ${PAGENAME}`
    api.fetchRoles()
  }, [])
  
  return (
    <PageContainer>
      <AppBar position="relative" elevation={0} color="transparent">
        <Toolbar className={css.toolbar}>
          <Typography variant="h5">
            {PAGENAME}
          </Typography>
          <IconButton edge="end" aria-label="Logout" onClick={() => auth.logout()}>
            <FiPower />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={css.root}>

        <Hidden implementation="css" xsDown>
          <TodosCard />
        </Hidden>
      </div>
    </PageContainer>
  );
}

export default Dashboard;

const useCSS = makeStyles(({ spacing }) => ({
  root: {
    width: '100%',
    minHeight: '100%',
    padding: spacing(2.5)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))