import * as React from 'react'
// importing components
import Root from '../../components/RootContainer'
import Main from '../../components/MainContainer'
import Sidebar from '../../components/HR/SidebarHR'
import Profile from './screens/Profile'
//importing HR Routes
import Routers from './HR.routes'
// import ing Route Context
import RouteContextProvider from '../../context/RouteContext'
import ProfilePageContext from '../../context/ProfilePageContext'

const HR = () => {


  return (
    <Root>
      <ProfilePageContext>
        <Sidebar />
        <RouteContextProvider>
          <Main>
            <Routers />
            <Profile />
          </Main>
        </RouteContextProvider>
      </ProfilePageContext>
    </Root>
  )
}


//
export default HR