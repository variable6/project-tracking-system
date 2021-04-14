import { useEffect, useContext } from 'react'

import { RouteContext } from '../../../context/RouteContext'

import setTitle from '../../../constants/pageTitle'

const pageName = 'Dashboard'

const Dashboard = () => {

  const route = useContext(RouteContext)

  useEffect(() => {
    setTitle(`BDM - ${pageName}`)
    route.setPageTitle(pageName)
  }, [])

  return (
    <>
    </>
  )
}

export default Dashboard