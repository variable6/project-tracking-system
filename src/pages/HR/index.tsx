import * as React from 'react'
// importing components
import Root from '../../components/RootContainer'
import Main from '../../components/MainContainer'
import Sidebar from '../../components/HR/SidebarHR'
//importing HR Routes
import Routers from './HR.routes'
// import ing Route Context
import RouteContextProvider from '../../context/RouteContext'

const HR = () => {

  const [mobileOpen, setMobileOpen1] = React.useState(false)

  const setMobileOpen = () => {
    setMobileOpen1(c => !c)
  }


  return (
    <Root>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <RouteContextProvider>
        <Main setMobileOpen={setMobileOpen}>
          <Routers />
        </Main>
      </RouteContextProvider>
    </Root>
  )
}


//
export default HR