import { useEffect, useContext } from 'react'
//import context
import useApp from '../useApp'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const { AppContext } = useApp()
  const { app, dispatch } = useContext(AppContext)

  useEffect(() => {
    document.title = `WorkSpace | PM - ${PAGENAME}`
  }, [])

  return (
    <>
      {app.auth.user.name}
      <button onClick={dispatch.fetchProjects}>Logout</button>
    </>
  );
}

export default Dashboard;