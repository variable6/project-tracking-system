import { makeStyles, Typography, ButtonGroup, Drawer, IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import { useState } from 'react'
import { Bar, Bubble, Doughnut, Line, PolarArea, Pie, Radar, Scatter } from 'react-chartjs-2'
import { FiMinimize, FiRefreshCw, FiMaximize, FiBarChart2 } from 'react-icons/fi';
import Card from "./Card";


interface PropsType {
  labels: string[]
  data: any[]
  title: string
  defaultChart: 'bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter'
  chartList: ('bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter')[]
  onReload: () => void
  isLoading: boolean,
  label: string
}

const options = { plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false }
const colors = ['#545454', '#E8EDDF', '#F5CB5C', '#242424', '#CFDBD5']

const Charts = ({
  data, labels, title, defaultChart, onReload, chartList, isLoading, label
}: PropsType) => {

  const css = useCSS()

  const [state, setState] = useState({
    chartType: defaultChart,
    isDrawerOpen: false
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChartType = (type: 'bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter') => {
    setState({
      ...state,
      chartType: type
    })
    handleClose()
  }

  const openDrawer = () => setState({ ...state, isDrawerOpen: true })
  const closeDrawer = () => setState({ ...state, isDrawerOpen: false })

  const labelsList = Array.from({ length: labels.length }, (_, i) => `0${i + 1}`)
  const colorList = labelsList.map((i, index) => colors[index % 5])

  const dataSet = {
    labels: labelsList,
    datasets: [
      {
        label: `# of ${label}`,
        data: data,
        backgroundColor: colorList,
        borderColor: colorList,
        borderWidth: 1,
        hoverOffset: 1.5
      }
    ]
  }
  const cardMenu = (
    <ButtonGroup variant="text" className={css.btnGroup} disableElevation aria-label="card options" >
      <IconButton
        aria-label="reload"
        onClick={onReload}
        className={css.iconBtn}
      >
        <FiRefreshCw className={isLoading ? css.refresh : ''} />
      </IconButton>
      <IconButton
        aria-label="chart-type"
        onClick={handleClick}
        className={css.iconBtn}
      >
        <FiBarChart2 />
      </IconButton>
      <IconButton
        aria-label={state.isDrawerOpen ? 'minimize' : 'maximize'}
        onClick={state.isDrawerOpen ? closeDrawer : openDrawer}
        className={css.iconBtn}
      >
        {state.isDrawerOpen ? <FiMinimize /> : <FiMaximize />}
      </IconButton>
    </ButtonGroup>
  )

  const chart = {
    'bar': <Bar type="bar" data={dataSet} options={options} />,
    'bubble': <Bubble type="bubble" data={dataSet} options={options} />,
    'doughnut': <Doughnut type="doughnut" data={dataSet} options={options} />,
    'line': <Line type="line" data={dataSet} options={options} />,
    'polar-area': <PolarArea type="PolarArea" data={dataSet} />,
    'pie': <Pie type="pie" data={dataSet} options={options} />,
    'radar': <Radar type="radar" data={dataSet} options={options} />,
    'scatter': <Scatter type="scatter" data={dataSet} options={options} />
  }

  return (
    <>
      <Card title={title} menu={cardMenu}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ textTransform: 'capitalize' }}
        >
          {
            chartList.map((item, index) => (
              <MenuItem key={`${item}-${index}`} onClick={() => handleChartType(item)}>{item}</MenuItem>
            ))
          }
        </Menu>
        <div className={css.root}>
          <div className={css.container}>
            {chart[state.chartType]}
          </div>
          <div className={css.container}>
            <div className={css.list}>
              {
                labels.map((label, index) => (
                  <div className={css.listItem}>
                    <div style={{ backgroundColor: colorList[index] }} />
                    <Typography variant="body2" color="textSecondary">&nbsp;&nbsp;0{index + 1} - {label}</Typography>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Card>
      <Modal
        variant="temporary"
        anchor="bottom"
        open={state.isDrawerOpen}
        onClose={closeDrawer}
        className={css.drawerContainer}
      >
        <Card title={title} menu={cardMenu}>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ textTransform: 'capitalize' }}
          >
            {
              chartList.map((item, index) => (
                <MenuItem key={`drawer-${item}-${index}`} onClick={() => handleChartType(item)}>{item}</MenuItem>
              ))
            }
          </Menu>
          <div className={css.rootD}>
            <div className={css.containerD}>
              {chart[state.chartType]}
            </div>
            <div className={css.container}>
              <div className={css.list}>
                {
                  labels.map((label, index) => (
                    <div className={css.listItem}>
                      <div style={{ backgroundColor: colors[index % 6] }} />
                      <Typography variant="body2" color="textSecondary">&nbsp;&nbsp;0{index + 1} - {label}</Typography>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  )
}

export const Charts2 = ({
  data, labels, title, defaultChart, onReload, chartList, isLoading, label
}: PropsType) => {

  const css = useCSS()

  const [state, setState] = useState({
    chartType: defaultChart,
    isDrawerOpen: false
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChartType = (type: 'bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter') => {
    setState({
      ...state,
      chartType: type
    })
    handleClose()
  }

  const openDrawer = () => setState({ ...state, isDrawerOpen: true })
  const closeDrawer = () => setState({ ...state, isDrawerOpen: false })

  const labelsList = Array.from({ length: labels.length }, (_, i) => `0${i + 1}`)
  const colorList = labelsList.map((i, index) => colors[index % 5])

  const dataSet = {
    labels: labelsList,
    datasets: [
      {
        label: `# of ${label}`,
        data: data,
        backgroundColor: colorList,
        borderColor: colorList,
        borderWidth: 1,
        hoverOffset: 1.5
      }
    ]
  }
  const cardMenu = (
    <ButtonGroup variant="text" className={css.btnGroup} disableElevation aria-label="card options" >
      <IconButton
        aria-label="reload"
        onClick={onReload}
        className={css.iconBtn}
      >
        <FiRefreshCw className={isLoading ? css.refresh : ''} />
      </IconButton>
      <IconButton
        aria-label="chart-type"
        onClick={handleClick}
        className={css.iconBtn}
      >
        <FiBarChart2 />
      </IconButton>
      <IconButton
        aria-label={state.isDrawerOpen ? 'minimize' : 'maximize'}
        onClick={state.isDrawerOpen ? closeDrawer : openDrawer}
        className={css.iconBtn}
      >
        {state.isDrawerOpen ? <FiMinimize /> : <FiMaximize />}
      </IconButton>
    </ButtonGroup>
  )

  const chart = {
    'bar': <Bar type="bar" data={dataSet} options={options} />,
    'bubble': <Bubble type="bubble" data={dataSet} options={options} />,
    'doughnut': <Doughnut type="doughnut" data={dataSet} options={options} />,
    'line': <Line type="line" data={dataSet} options={options} />,
    'polar-area': <PolarArea type="PolarArea" data={dataSet} />,
    'pie': <Pie type="pie" data={dataSet} options={options} />,
    'radar': <Radar type="radar" data={dataSet} options={options} />,
    'scatter': <Scatter type="scatter" data={dataSet} options={options} />
  }

  return (
    <>
      <Card title={title} menu={cardMenu}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ textTransform: 'capitalize' }}
        >
          {
            chartList.map((item, index) => (
              <MenuItem key={`${item}-${index}`} onClick={() => handleChartType(item)}>{item}</MenuItem>
            ))
          }
        </Menu>
        <div className={css.root2}>
          <section className={css.graph}>
            {chart[state.chartType]}
          </section>
          <section>
            <div className={css.flexList}>
              {
                labels.map((label, index) => (
                  <div>
                    <Typography variant="body2" component="p">&nbsp;&nbsp;0{index + 1} - {label}</Typography>
                  </div>
                ))
              }
            </div>
          </section>
        </div>
      </Card>
      <Modal
        variant="temporary"
        anchor="bottom"
        open={state.isDrawerOpen}
        onClose={closeDrawer}
        className={css.drawerContainer}
      >
        <Card title={title} menu={cardMenu}>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ textTransform: 'capitalize' }}
          >
            {
              chartList.map((item, index) => (
                <MenuItem key={`drawer-${item}-${index}`} onClick={() => handleChartType(item)}>{item}</MenuItem>
              ))
            }
          </Menu>
          <div className={css.root2}>
            <section className={css.graph}>
              {chart[state.chartType]}
            </section>
            <section>
              <div className={css.flexList}>
                {
                  labels.map((label, index) => (
                    <div>
                      <Typography variant="body2" component="p">&nbsp;&nbsp;0{index + 1} - {label}</Typography>
                    </div>
                  ))
                }
              </div>
            </section>
          </div>
        </Card>
      </Modal>
    </>
  )
}


export const MultiCharts2 = ({
  dataset1, dataset2, labels, title, defaultChart, onReload, isLoading, label1, label2
}: {
  label1: string,
  label2: string,
  dataset1: (number | string)[],
  dataset2: (number | string)[],
  labels: string[],
  defaultChart: 'bar-line' | 'bar-bar' | 'line-bar' | 'line-line',
  title: string,
  onReload: () => void,
  isLoading: boolean,
}) => {

  const css = useCSS()

  const [state, setState] = useState({
    chartType: defaultChart,
    isDrawerOpen: false
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChartType = (type: 'bar-line' | 'bar-bar' | 'line-bar' | 'line-line') => {
    setState({
      ...state,
      chartType: type
    })
    handleClose()
  }

  const openDrawer = () => setState({ ...state, isDrawerOpen: true })
  const closeDrawer = () => setState({ ...state, isDrawerOpen: false })

  const labelsList = Array.from({ length: labels.length }, (_, i) => `0${i + 1}`)

  const data = {
    labels: labelsList,
    datasets: [
      {
        type: state.chartType.split('-')[0],
        label: label1,
        borderColor: '#F5CB5C',
        backgroundColor: '#F5CB5C',
        borderWidth: 1,
        data: dataset1,
      },
      {
        type: state.chartType.split('-')[1],
        label: label2,
        backgroundColor: '#545454',
        data: dataset2,
        borderColor: '#545454',
        borderWidth: 1,
      }
    ],
  };
  const cardMenu = (
    <ButtonGroup variant="text" className={css.btnGroup} disableElevation aria-label="card options" >
      <IconButton
        aria-label="reload"
        onClick={onReload}
        className={css.iconBtn}
      >
        <FiRefreshCw className={isLoading ? css.refresh : ''} />
      </IconButton>
      <IconButton
        aria-label="chart-type"
        onClick={handleClick}
        className={css.iconBtn}
      >
        <FiBarChart2 />
      </IconButton>
      <IconButton
        aria-label={state.isDrawerOpen ? 'minimize' : 'maximize'}
        onClick={state.isDrawerOpen ? closeDrawer : openDrawer}
        className={css.iconBtn}
      >
        {state.isDrawerOpen ? <FiMinimize /> : <FiMaximize />}
      </IconButton>
    </ButtonGroup>
  )

  const chart = (
    <Card title={title} menu={cardMenu}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ textTransform: 'capitalize' }}
      >
        <MenuItem onClick={() => handleChartType('bar-line')}>Bar & Line</MenuItem>
        <MenuItem onClick={() => handleChartType('line-bar')}>Line & Bar</MenuItem>
        <MenuItem onClick={() => handleChartType('bar-bar')}>Bar & Bar</MenuItem>
        <MenuItem onClick={() => handleChartType('line-line')}>Line & Line</MenuItem>
      </Menu>
      <div className={css.root2}>
        <section className={css.graph}>
          <Bar type="bar" data={data} />
        </section>
        <section>
          <div className={css.flexList}>
            {
              labels.map((label, index) => (
                <div>
                  <Typography variant="body2" component="p">&nbsp;&nbsp;0{index + 1} - {label}</Typography>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </Card>
  )

  return (
    <>
      {chart}
      <Modal
        variant="temporary"
        anchor="bottom"
        open={state.isDrawerOpen}
        onClose={closeDrawer}
        className={css.drawerContainer}
      >
        {chart}
      </Modal>
    </>
  )
}

export default Charts

const Modal = withStyles(({ spacing, breakpoints }) => ({
  paper: {
    minHeight: '100vh',
    backdropFilter: 'blur(5px)',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: spacing(1.5),
    [breakpoints.only('sm')]: {
      padding: spacing(4)
    },
    [breakpoints.up('md')]: {
      padding: spacing(15)
    }
  }
}))(Drawer)

const useCSS = makeStyles(({ spacing, palette, shape, breakpoints }) => ({
  root2: {
    display: 'flex',
    flexDirection: 'column',
  },
  graph: {
    '& canvas': {
      minHeight: spacing(40),
      maxHeight: spacing(50),
      [breakpoints.only('md')]: {
        minHeight: spacing(35),
        maxHeight: spacing(45),
      },
      [breakpoints.only('sm')]: {
        minHeight: spacing(30),
        maxHeight: spacing(40),
      },
      [breakpoints.down('sm')]: {
        minHeight: spacing(15),
        maxHeight: spacing(35),
      }
    }
  },
  flexList: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(37)}px, 1fr))`,
    '& > div': {
      backgroundColor: palette.background.default,
      margin: spacing(0.35),
      padding: spacing(0.75),
      borderRadius: shape.borderRadius,
      '& p': {
        paddingLeft: spacing(1),
        fontSize: spacing(1.9),
        color: palette.text.primary
      }
    },
    maxHeight: spacing(45),
    overflow: 'auto'
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
  container: {
    width: '100%',
    minHeight: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:last-child': {
      height: '100%',
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 0
    },
    '& canvas': {
      maxHeight: spacing(45),
      minHeight: spacing(30)
    },
    overflow: 'auto'
  },
  root: {
    maxWidth: '100%',
    minHeight: '100%',
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(45)}px, 1fr))`,
    gridGap: spacing(1.25),
    [breakpoints.down('xs')]: {
      'grid-template-columns': `repeat(auto-fit, minmax(${spacing(27.5)}px, 1fr))`,
      gridGap: spacing(1.15),
    },
    overflow: 'auto'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
  },
  listItem: {
    display: 'flex',
    marginBottom: spacing(1),
    '& > div': {
      width: spacing(4.5),
      height: spacing(3),
      borderRadius: shape.borderRadius,
    }
  },
  drawerContainer: {
    width: '100',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  containerD: {
    width: '100%',
    minHeight: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:last-child': {
      height: '100%',
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 0
    },
    '& canvas': {
      minHeight: spacing(50),
      maxHeight: spacing(70)
    }
  },
  rootD: {
    width: '100%',
    minHeight: '100%',
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(45)}px, 1fr))`,
    gridGap: spacing(1.25)
  },
  btnGroup: {
    borderRadius: spacing(999)
  },
  iconBtn: {
    width: spacing(4.5),
    height: spacing(4.9),
    padding: `${spacing(1.5)}px ${spacing(1.2)}px`
  }
}))