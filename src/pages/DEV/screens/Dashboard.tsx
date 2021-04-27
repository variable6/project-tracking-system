import { useEffect, useContext } from 'react'
import PageContainer from '../layouts/PageContainer'
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
    <PageContainer>
      <button onClick={dispatch.auth.logout}>logout</button>
    </PageContainer>
  );
}

export default Dashboard;