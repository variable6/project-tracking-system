import { useState, useContext, useEffect } from 'react'
//importing context
import { RouteContext } from '../../../context/RouteContext'
import { TodosCard } from '../../../components/TodoList'
// importing components
import { useCSS } from '../../BDM/screens/Dashboard'
import axiosConfig from '../../../config/axiosConfig'
import storage from '../../../config/localStorageConfig'
import Charts from '../../../components/Charts'
import { Hidden } from '@material-ui/core'

//component
const Dashboard = () => {

  const css = useCSS()
  const route = useContext(RouteContext)
  const pageName = 'Dashboard'

  useEffect(() => {
    route.setContext({
      ...route.context,
      pageTitle: pageName
    })
    document.title = `WorkSpace | PTS - ${pageName}`
  }, [])

  return (
    <>
      <Hidden xsDown implementation="css">
        <div className={css.flexContainer}>
          <EmpChart />
          <EmpChartStatus />
        </div>
      </Hidden>
      <Hidden smUp implementation="css">
        <EmpChart />
        <EmpChartStatus />
      </Hidden>
      <ProjectChart />
      <TodosCard />
    </>
  )
}


const ProjectChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('project-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/hr/chart/emp')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        }
        setState(dataSet)
        storage.add('project-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching project chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts label="Projects"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Projects" data={state.data}
      labels={state.labels} defaultChart='line'
      onReload={fetchData} isLoading={isLoading}
    />
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
      .get('/hr/chart/emp')
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
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const EmpChartStatus = () => {

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
      .get('/hr/chart/emp/status')
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
    <Charts label="Employees"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Employees with status" data={state.data}
      labels={state.labels} defaultChart="bar"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

export default Dashboard