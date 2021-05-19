import { useEffect, useContext, useState } from 'react'
import PageContainer from '../layouts/PageContainer'
//import context
import axiosConfig from '../../../config/axiosConfig'
import storage from '../../../config/localStorageConfig'
import { DataContext } from '../DataContext'
import { AuthContext } from '../../../context/AuthContext'
import useFetch from '../useFetch'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Hidden, IconButton, makeStyles } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'
import { FiPower } from 'react-icons/fi'
import Charts from '../../../components/Charts'


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
        <ChartTask />
        <ProjectChart />
        <ProjectPercentageChart />
        <Hidden implementation="css" xsDown>
          <TodosCard />
        </Hidden>
      </div>
    </PageContainer>
  );
}

export default Dashboard;

const ChartTask = () => {
  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('task-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/dev/chart/tasks')
      .then(({ data }) => {
        console.log(data)
        const dataSet = {
          labels: data.map((element: any) => element.label),
          data: data.map((element: any) => element.data)
        }
        console.log(dataSet)
        setState(dataSet)
        storage.add('task-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Tasks"
      chartList={['pie', 'doughnut', 'bar', 'line', 'bubble', 'radar', 'scatter', 'polar-area']}
      title="Your Tasks" data={state.data}
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const ProjectChart = () => {
  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('percent-pm-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/pm/chart/projects/percent')
      .then(({ data }) => {
        console.log(data, 1)
        const dataSet = {
          labels: data.map((element: any) => element.label),
          data: data.map((element: any) => element.data)
        }
        console.log(dataSet)
        // setState(dataSet)
        storage.add('percent-pm-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching percent chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Tasks"
      chartList={['pie', 'doughnut', 'bar', 'line', 'bubble', 'radar', 'scatter', 'polar-area']}
      title="Your Tasks" data={state.data}
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const ProjectPercentageChart = () => {
  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('project-percent-pm-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/pm/chart/projects/percent')
      .then(({ data }) => {
        console.log(data, 0)
        const dataSet = {
          labels: data.map((element: any) => element.label),
          data: data.map((element: any) => element.data)
        }
        console.log(dataSet)
        // setState(dataSet)
        storage.add('project-percent-pm-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching percent chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Tasks"
      chartList={['pie', 'doughnut', 'bar', 'line', 'bubble', 'radar', 'scatter', 'polar-area']}
      title="Your Tasks" data={state.data}
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

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