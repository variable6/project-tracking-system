import { useEffect, useContext } from 'react'
import PageContainer from '../layouts/PageContainer'
//import context
import { DataContext } from '../DataContext'
import { AuthContext } from '../../../context/AuthContext'
import useFetch from '../useFetch'


const PAGENAME = 'Dashboard'

const Dashboard = () => {

  const { data } = useContext(DataContext)
  const auth = useContext(AuthContext)

  const api = useFetch()

  useEffect(() => {
    document.title = `WorkSpace | PM - ${PAGENAME}`
    api.fetchRoles()
  }, [])
  
  return (
    <PageContainer>
      <button onClick={() => auth.logout()}>logout</button>
      {data.role === 'PM' && <p>qwerty pm</p>}
      {data.role === 'DEV' && <p>qwerty DEV</p>}
      {data.roleList.isPM && <p>qwerty PM .</p>}
      {data.roleList.isTL && <p>qwerty TL.</p>}
    </PageContainer>
  );
}

export default Dashboard;