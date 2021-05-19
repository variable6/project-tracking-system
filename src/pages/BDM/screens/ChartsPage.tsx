import { useContext, useEffect, useState } from "react"
import { RouteContext } from "../../../context/RouteContext"
import axiosConfig from '../../../config/axiosConfig'
import storage from '../../../config/localStorageConfig'
import setTitle from '../../../constants/pageTitle'
import {
  useCSS, EmpChart, EmpStatusChart, ProjectsChart, TaskChart, TaskStatusChart
} from './Dashboard'
import BreadCrumbs from "../../../components/Breadcrumbs"
import { Charts2, MultiCharts2 } from "../../../components/Charts"
import { Hidden, makeStyles } from "@material-ui/core"

const pageName = 'Analytics'

const ChartsPage = () => {

  const css = useCSS()
  const css1 = useClasses()
  const route = useContext(RouteContext)

  useEffect(() => {
    setTitle(`BDM - ${pageName}`)
    route.setPageTitle(pageName)
  }, [])

  return (
    <>
      <BreadCrumbs currentPage={pageName} links={[{ label: 'Dashboard', path: '/' }]} />
      <Hidden xsDown implementation="js">
        <div className={css1.layout3}>
          <TaskStatusChart type="polar-area" />
          <section>
            <TaskChart />
            <ProjectsChart />
          </section>
        </div>
        <div className={css.flexContainer}>
          <EmpChart />
          <EmpStatusChart />
        </div>
      </Hidden>
      <Hidden smUp implementation="js">
        <ProjectsChart />
        <TaskStatusChart type="line" />
        <TaskChart />
      </Hidden>
      <AllProjectsStatus />
      <AllProjectsTask />
      <Hidden smUp implementation="js">
        <EmpChart />
        <EmpStatusChart />
      </Hidden>
    </>
  );
}

const AllProjectsStatus = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('all-project-chart')

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>(empChartTL ? empChartTL : {
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/projects/percent')
      .then(({ data }) => {
        console.log(data)
        const dataSet = {
          labels: data.map((element: any) => element.projectTitle),
          data: data.map((element: any) => element.progress)
        }
        setState(dataSet)
        storage.add('all-project-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching project percent chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts2 label="Projects"
      chartList={['pie', 'doughnut', 'bar', 'line']}
      title="Projects & their progress" data={state.data}
      labels={state.labels} defaultChart="bar"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

const AllProjectsTask = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const empChartTL = storage.get('tp-project-chart')

  const [state, setState] = useState<{
    dataset1: (number | string)[],
    dataset2: (number | string)[],
    labels: string[]
  }>(empChartTL ? empChartTL : {
    dataset1: [],
    dataset2: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    navigator.onLine && axiosConfig()
      .get('/bdm/chart/projects/percent')
      .then(({ data }) => {
        const dataSet = {
          labels: data.map((element: any) => element.projectTitle),
          dataset1: data.map((element: any) => element.taskCompleted),
          dataset2: data.map((element: any) => element.totalTasks)
        }
        setState(dataSet)
        storage.add('tp-project-chart', dataSet)
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching project task chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <MultiCharts2 label1='Completed Tasks' label2='Total Tasks'
      title="Projects & their tasks" dataset1={state.dataset1} dataset2={state.dataset2}
      labels={state.labels} defaultChart="bar-bar"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

export default ChartsPage;

const useClasses = makeStyles(({ spacing, breakpoints }) => ({
  layout3: {
    display: 'grid',
    gridTemplateColumns: '4fr 7fr',
    gridColumnGap: spacing(2),
    [breakpoints.down(1530)]: {
      gridTemplateColumns: '1fr',
      '& > section': {
        display: 'grid',
        gridTemplateColumns: '5fr 7fr',
        gridColumnGap: spacing(2),
      }
    },
    [breakpoints.down(1260)]: {
      '& > section': {
        display: 'grid',
        gridTemplateColumns: '6fr 6fr',
        gridColumnGap: spacing(2),
      }
    },
    [breakpoints.down(1260)]: {
      '& > section': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: spacing(2),
      }
    },
    [breakpoints.down('sm')]: {
      '& > section': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: spacing(2),
      }
    },
    [breakpoints.down(810)]: {
      '& > section': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridColumnGap: spacing(2),
      }
    }
  }
}))