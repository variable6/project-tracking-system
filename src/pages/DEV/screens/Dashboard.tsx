import { useEffect, useContext } from 'react'
//import context
import { RouteContext } from '../../../context/RouteContext'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const route = useContext(RouteContext)

  useEffect(() => {
    document.title = `WorkSpace | PM - ${PAGENAME}`
    route.setPageTitle(PAGENAME)
  }, [])

  return (
    <></>
  );
}

export default Dashboard;