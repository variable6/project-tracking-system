import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Hidden,
  ButtonGroup,
  IconButton,
  Drawer, withStyles, Box
} from '@material-ui/core'
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress'
import {
  FiSearch, FiMaximize, FiMinimize, FiRefreshCw
} from 'react-icons/fi'
import Card from '../../../components/Card'
import useTable from '../../../hooks/useTable'
import { v4 as setKey } from 'uuid'
import Loader from './../../../components/Loader';
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
import { useCSS as useDataTableCSS } from './Employees/EmpTable'
import moment from 'moment'

const pageName = 'Analytics'

const getDate = (date: null | Date) => date === null ? '-N/A-' : moment(date).format('MMM DD, YYYY')

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
      <DataTable />
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

const DataTable = () => {

  const projectsLS = storage.get('projects_data_table')

  const css = useDataTableCSS()
  const classes = useClasses()

  const headCell = [
    { id: 'projectTitle', label: 'Titles' },
    { id: 'projectManager', label: 'Manager' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'totalTasks', label: 'Total Tasks' },
    { id: 'taskCompleted', label: 'Completed Tasks' },
    { id: 'taskNotStarted', label: 'Not Started Tasks' },
    { id: 'taskActive', label: 'Active Tasks' },
    { id: 'taskOnhold', label: 'On-hold Tasks' },
    { id: 'progress', label: 'Progress' },
  ]

  const [isLoading, setIsLoading] = useState(true)
  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const [viewProject, setViewProject] = useState(false)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const [projects, setProjects] = useState<any[]>(projectsLS ? projectsLS : [])

  const fetchProjects = () => {
    setLoader()
    axiosConfig()
      .get('/bdm/chart/projects/data')
      .then(({ data }) => {
        console.log(data)
        setProjects(data)
        storage.add('projects_data_table', data)
        removeLoader()
      })
      .catch(() => {
        console.log('error occured')
        removeLoader()
      })
  }

  useEffect(fetchProjects, [])

  const [filterFN, setFilterFN] = useState({
    fn: (item: any) => item
  })

  const [searchBy, setSearchBy] = useState('projectTitle')
  // ======================= initializing filterFunc
  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFN({
      fn: item => {
        if (target.value === '')
          return item
        else
          return item.filter((x: any) => x[searchBy].toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable({
    records: projects,
    headCells: headCell,
    filterFN
  })

  const cardMenu = (
    <ButtonGroup variant="text" style={{ borderRadius: 999 }} disableElevation aria-label="card options" >
      <IconButton
        aria-label="reload"
        onClick={fetchProjects}
        className={classes.iconBtn}
      >
        <FiRefreshCw className={isLoading ? classes.refresh : ''} />
      </IconButton>
      <IconButton
        aria-label={isDrawerOpen ? 'minimize' : 'maximize'}
        onClick={isDrawerOpen ? closeDrawer : openDrawer}
        className={classes.iconBtn}
      >
        {isDrawerOpen ? <FiMinimize /> : <FiMaximize />}
      </IconButton>
    </ButtonGroup>
  )

  const TableCard = (
    <Card title="Projects & their details" menu={cardMenu} >
      <div className={css.toolbar}>
        <div className={css.subFlex} style={{ marginTop: 10 }}>
          <Typography
            variant="body1" style={{ fontWeight: 600 }} className={css.subheading}
          >
            Filters
          </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              labelId="employee-search-label"
              id="employee-search"
              className={css.searchBy}
              value={searchBy}
              onChange={({ target }) => setSearchBy(`${target.value}`)}
            >
              {
                headCell.map(item => (
                  <MenuItem key={setKey()} value={item.id}>
                    Search by {item.label}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" style={{ flexGrow: 1 }}>
            <OutlinedInput
              id="employee-search"
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <FiSearch className={css.searchIcon} />
                </InputAdornment>
              }
              onChange={handleSearch}
            />
          </FormControl>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        {(isLoading && projects.length === 0) && (<div className={css.loaderContainer}><Loader /></div>)}
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map((project: any) => (
                <TableRow key={setKey()} onClick={() => null} >
                  <TableCell >{project.projectTitle}</TableCell>
                  <TableCell >{project.projectManager}</TableCell>
                  <TableCell >{getDate(project.startDate)}</TableCell>
                  <TableCell >{getDate(project.endDate)}</TableCell>
                  <TableCell >{project.totalTasks}</TableCell>
                  <TableCell >{project.taskCompleted}</TableCell>
                  <TableCell >{project.taskNotStarted}</TableCell>
                  <TableCell >{project.taskActive}</TableCell>
                  <TableCell >{project.taskOnhold}</TableCell>
                  <TableCell ><CircularProgressWithLabel value={Math.round(project.progress)} /></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
    </Card>
  )

  return (
    <>
      {TableCard}
      <Modal
        open={isDrawerOpen}
        anchor="bottom"
        onClose={closeDrawer}
      >
        {TableCard}
      </Modal>
      <Modal
        open={viewProject}
      >

      </Modal>
    </>
  );
}

export default ChartsPage

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Modal = withStyles(({ spacing, breakpoints }) => ({
  paper: {
    minHeight: '100vh',
    backdropFilter: 'blur(5px)',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: spacing(1.5),
    [breakpoints.only('sm')]: {
      padding: spacing(3)
    },
    [breakpoints.up('md')]: {
      padding: spacing(4)
    }
  }
}))(Drawer)

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
  },
  btnGroup: {
    borderRadius: spacing(999)
  },
  iconBtn: {
    width: spacing(4.5),
    height: spacing(4.9),
    padding: `${spacing(1.5)}px ${spacing(1.2)}px`
  },
  refresh: {
    animation: '$spin 945ms linear infinite'
  },
  '@keyframes spin': {
    '100%': {
      '-webkit-transform': 'rotate(360deg)',
      transform: 'rotate(360deg)',
      '-moz-transform': 'rotate(360deg)'
    }
  },
}))