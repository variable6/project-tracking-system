import { useEffect, useContext, useState } from 'react'
import { RouteContext } from '../../../context/RouteContext'

import setTitle from '../../../constants/pageTitle'
import axiosConfig from '../../../config/axiosConfig'
import storage from '../../../config/localStorageConfig'
import { Hidden, makeStyles } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'
import Charts from '../../../components/Charts'
import BreadCrumbs from '../../../components/Breadcrumbs'

const pageName = 'Dashboard'

const Dashboard = () => {

  const css = useCSS()
  const route = useContext(RouteContext)

  useEffect(() => {
    setTitle(`BDM - ${pageName}`)
    route.setPageTitle(pageName)
  }, [])

  return (
    <>
      <BreadCrumbs currentPage="Dashboard" links={[]} />
      <Hidden xsDown implementation="js" >
        <div className={css.flexContainer}>
          <TaskChart />
          <TaskStatusChart />
        </div>
        <div className={css.threeLayout}>
          <ProjectsChart />
          <TodosCard />
        </div>
        <div className={css.flexContainer}>
          <EmpChart />
          <EmpStatusChart />
        </div>
      </Hidden>
      <Hidden smUp implementation="js" >
        <TaskChart />
        <TaskStatusChart />
        <ProjectsChart />
        <TodosCard />
        <EmpChart />
        <EmpStatusChart />
      </Hidden>
    </>
  )
}

const EmpChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('emp-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/emp')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('emp-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Employees"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Employees & their roles" data={state.data}
      labels={state.labels} defaultChart="pie"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const EmpStatusChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('emp-status-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/emp/status')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('emp-status-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee status chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Employees with Status"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Employees & their status" data={state.data}
      labels={state.labels} defaultChart="line"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const ProjectsChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('emp-project-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/projects')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('emp-project-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee project chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Projects"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Projects" data={state.data}
      labels={state.labels} defaultChart="bar"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const TaskChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('emp-task-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/tasks/priority')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('emp-task-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Tasks"
      chartList={['pie', 'doughnut', 'bar', 'line', 'bubble', 'polar-area', 'radar', 'scatter']}
      title="Tasks" data={state.data}
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const TaskStatusChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('status-task-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/tasks/status')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('status-task-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Tasks with status"
      chartList={['pie', 'doughnut', 'bar', 'line', 'bubble', 'polar-area', 'radar', 'scatter']}
      title="Tasks & its status" data={state.data}
      labels={state.labels} defaultChart="line"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

export default Dashboard

export const useCSS = makeStyles(({ spacing, breakpoints }) => ({
  flexContainer: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(47)}px, 1fr))`,
    'grid-gap': spacing(2.25)
  },
  threeLayout: {
    display: 'grid',
    'grid-gap': spacing(2.25),
    'grid-template-columns': '10fr 13fr',
    [breakpoints.only('md')]: {
      'grid-template-columns': '3fr 2fr'
    },
    [breakpoints.down(1080)]: {
      'grid-template-columns': '1fr'
    },
    [breakpoints.down('sm')]: {
      'grid-template-columns': '7fr 5fr'
    },
    [breakpoints.down(888)]: {
      'grid-template-columns': '1fr'
    }
  }
}))