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
import Charts, { Charts2, MultiCharts2, MultiCharts3 } from '../../../components/Charts'
import { useCSS as useStyles } from './../../BDM/screens/Dashboard'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const { data } = useContext(DataContext)
  const auth = useContext(AuthContext)

  const css = useCSS()
  const css1 = useStyles()

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
        {data.role === 'DEV' && (
          <div className={css1.flexContainer}><ChartTask /></div>
        )}
        {data.role === 'TL' && (
          <div className={css1.flexContainer}><ProjectChart /></div>
        )}
        {data.role === 'PM' && (
          <div className={css1.flexContainer}><ProjectPercentageChart /></div>
        )}
        <TodosCard />
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
        console.log(dataSet, data, 'dev')
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

  const empChartTL = storage.get('tp-3-project-chart')

  const [state, setState] = useState<{
    dataset1: (number | string)[],
    dataset2: (number | string)[],
    dataset3: (number | string)[],
    labels: string[]
  }>(empChartTL ? empChartTL : {
    dataset1: [],
    dataset2: [],
    dataset3: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/tl/chart/projects/percent')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.projectTitle),
          dataset2: data.map((element: any) => element.taskCompleted),
          dataset3: data.map((element: any) => element.totalTasks),
          dataset1: data.map((element: any) => element.progress)
        }
        console.log(dataSet, 'data', data)
        setState(dataSet)
        storage.add('tp-3-project-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching project task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <>
      <Charts2 label='Project Progress'
        title="Projects & it's status(TL)" data={state.dataset1}
        labels={state.labels} defaultChart="bar" chartList={['bar', 'bubble', 'doughnut', 'line', 'pie', 'polar-area']}
        onReload={fetchData} isLoading={isLoading}
      />
      <MultiCharts2 label1="completed Tasks(TL)" label2="Total Tasks"
        title="Tasks & thier status" dataset1={state.dataset2} dataset2={state.dataset3}
        labels={state.labels} defaultChart="bar-bar"
        onReload={fetchData} isLoading={isLoading}
      />
    </>
  )
}

const ProjectPercentageChart = () => {
  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('project-percent-pm-chart')

  const [state, setState] = useState<{
    dataset1: (number | string)[],
    dataset2: (number | string)[],
    dataset3: (number | string)[],
    labels: string[]
  }>(empChartTL ? empChartTL : {
    dataset1: [],
    dataset2: [],
    dataset3: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/pm/chart/projects/percent')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.projectTitle),
          dataset2: data.map((element: any) => element.taskCompleted),
          dataset3: data.map((element: any) => element.totalTasks),
          dataset1: data.map((element: any) => element.progress)
        }
        console.log(dataSet, 'data', data)
        setState(dataSet)
        storage.add('project-percent-pm-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching project task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <>
      <Charts2 label='Project Progress'
        title="Projects & it's status(PM)" data={state.dataset1}
        labels={state.labels} defaultChart="bar" chartList={['bar', 'bubble', 'doughnut', 'line', 'pie', 'polar-area']}
      onReload={fetchData} isLoading={isLoading}
    />
      <MultiCharts2 label1="completed Tasks" label2="Total Tasks"
        title="Tasks & it's status(PM)" dataset1={state.dataset2} dataset2={state.dataset3}
        labels={state.labels} defaultChart="bar-bar"
        onReload={fetchData} isLoading={isLoading}
      />
    </>
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