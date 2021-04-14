import { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Root from '../../components/RootContainer'
import Sidebar from '../../components/DEV/SidebarPM';
import RouteContextProvider from '../../context/RouteContext';
import Routes from './DEV.routes'

const ProjectManager = () => {

  const [sidebar, setSidebar] = useState(false)

  const setMobileOpen = () => {
    setSidebar(!sidebar)
  }

  return (
    <Root>
      <Sidebar mobileOpen={sidebar} setMobileOpen={setMobileOpen} />
      <RouteContextProvider>
        <MainContainer setMobileOpen={setMobileOpen}>
          <Routes />
        </MainContainer>
      </RouteContextProvider>
    </Root>
  );
}

export default ProjectManager