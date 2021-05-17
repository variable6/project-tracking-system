import { makeStyles, Typography, Drawer, withStyles } from '@material-ui/core';
import { useState } from 'react'
import { Bar, Bubble, Doughnut, Line, PolarArea, Pie, Radar, Scatter } from 'react-chartjs-2'
import { FiMinimize, FiRefreshCw, FiMaximize } from 'react-icons/fi';
import Card from "./Card";


interface PropsType {
  labels: string[]
  data: any[]
  title: string
  defaultChart: 'bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter'
  chartList?: ('bar' | 'bubble' | 'doughnut' | 'line' | 'polar-area' | 'pie' | 'radar' | 'scatter')[]
  onReload: () => void
  isLoading: boolean
}

const options = { plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false }
const colors = ['#545454', '#E8EDDF', '#F5CB5C', '#242424', '#CFDBD5']

const Charts = ({
  data, labels, title, defaultChart, onReload, chartList, isLoading
}: PropsType) => {

  const css = useCSS()

  const [state, setState] = useState({
    chartType: defaultChart,
    isDrawerOpen: false
  })

  const openDrawer = () => setState({ ...state, isDrawerOpen: true })
  const closeDrawer = () => setState({ ...state, isDrawerOpen: false })

  const dataSet = {
    labels: Array.from({ length: labels.length }, (_, i) => `0${i + 1}`),
    datasets: [
      {
        label: '# of Employees',
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        hoverOffset: 1.5
      }
    ]
  }

  const cardOprtions = [{
    label: 'reload',
    onClick: onReload,
    icon: <FiRefreshCw className={isLoading ? css.refresh : ''} />
  }, {
    label: state.isDrawerOpen ? 'minimize' : 'maximize',
    onClick: state.isDrawerOpen ? closeDrawer : openDrawer,
    icon: state.isDrawerOpen ? <FiMinimize /> : <FiMaximize />
  }]

  const chart = {
    'bar': <Bar type="bar" data={dataSet} options={options} />,
    'bubble': <Bubble type="bubble" data={dataSet} />,
    'doughnut': <Doughnut width={300} type="doughnut" data={dataSet} options={options} />,
    'line': <Line type="line" data={dataSet} />,
    'polar-area': <PolarArea type="PolarArea" data={dataSet} />,
    'pie': <Pie type="pie" data={dataSet} />,
    'radar': <Radar type="radar" data={dataSet} />,
    'scatter': <Scatter type="scatter" data={dataSet} />
  }

  // const Chart = (

  // )

  return (
    <>
      <Card title={title} options={cardOprtions}>
        <div className={css.root}>
          <div className={css.container}>
            {chart[state.chartType]}
          </div>
          <div className={css.container}>
            <div className={css.list}>
              {
                labels.map((label, index) => (
                  <div className={css.listItem}>
                    <div style={{ backgroundColor: colors[index] }} />
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
        <Card title={title} options={cardOprtions}>
          <div className={css.rootD}>
            <div className={css.containerD}>
              {chart[state.chartType]}
            </div>
            <div className={css.container}>
              <div className={css.list}>
                {
                  labels.map((label, index) => (
                    <div className={css.listItem}>
                      <div style={{ backgroundColor: colors[index] }} />
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
    }
  }
}))(Drawer)

const useCSS = makeStyles(({ spacing, shape, breakpoints }) => ({
  refresh: {
    animation: '$spin 1s linear infinite'
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
      minWidth: spacing(25)
    }
  },
  root: {
    width: '100%',
    minHeight: '100%',
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(45)}px, 1fr))`,
    gridGap: spacing(1.25),
    [breakpoints.down('xs')]: {
      'grid-template-columns': `repeat(auto-fit, minmax(${spacing(27.5)}px, 1fr))`,
      gridGap: spacing(1.15),
    }
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
      maxHeight: spacing(65)
    }
  },
  rootD: {
    width: '100%',
    minHeight: '100%',
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(45)}px, 1fr))`,
    gridGap: spacing(1.25)
  }
}))