import { useEffect, useContext, useState } from 'react'
import { Doughnut, Bar, PolarArea, Line } from 'react-chartjs-2'
import { RouteContext } from '../../../context/RouteContext'

import setTitle from '../../../constants/pageTitle'
import Card from '../../../components/Card'
import axiosConfig from '../../../config/axiosConfig'
import { makeStyles } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'
import Charts from '../../../components/Charts'

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
      <div className={css.flexContainer}>
        <EmpChart />
        <EmpChart />
      </div>
      <TodosCard />
    </>
  )
}

const EmpChart = () => {

  const [isLoading, setIsLoading] = useState(true)

  const setLoader = () => setIsLoading(true)
  const removeLoader = () => setIsLoading(false)

  const [state, setState] = useState<{ data: (number | string)[], labels: string[] }>({
    data: [],
    labels: []
  })

  const fetchData = () => {
    setLoader()
    axiosConfig()
      .get('/bdm/chart/emp')
      .then(({ data }) => {
        setState({
          labels: data.map((element: any) => element.label).splice(1, 6),
          data: data.map((element: any) => element.data).splice(1, 6)
        })
        removeLoader()
      })
      .catch(() => {
        console.log('ERROR while fetching employee chart')
        removeLoader()
      })
  }

  useEffect(fetchData, [])

  return (
    <Charts
      title="Employees" data={state.data}
      labels={state.labels} defaultChart="doughnut"
      onReload={fetchData} isLoading={isLoading}
    />
  )
}

export default Dashboard

const useCSS = makeStyles(({ spacing }) => ({
  flexContainer: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(47)}px, 1fr))`,
    'grid-gap': spacing(2.25)
  }
}))