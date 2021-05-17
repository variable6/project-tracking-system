import { useEffect, useContext, useState } from 'react'
import { Doughnut, Bar, PolarArea, Line } from 'react-chartjs-2'
import { RouteContext } from '../../../context/RouteContext'

import setTitle from '../../../constants/pageTitle'
import Card from '../../../components/Card'
import axiosConfig from '../../../config/axiosConfig'
import { makeStyles } from '@material-ui/core'
import { TodosCard } from '../../../components/TodoList'

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

const empChartDataset = {
  label: '# of Employees',
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ],
  borderWidth: 1,
}

const EmpChart = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Employees',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    axiosConfig()
      .get('/bdm/chart/emp')
      .then(({ data }) => {
        setData(cur => ({
          ...cur,
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple',],
          datasets: [{
            ...empChartDataset,
            data: data.map((element: any) => element.data).splice(1, 6)
          }]
        }))
        setIsLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <Card title="Employees" >
      {isLoading || <Line type="bar" options={{ plugins: { legend: { position: 'bottom' } } }} data={data} />}
    </Card>
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