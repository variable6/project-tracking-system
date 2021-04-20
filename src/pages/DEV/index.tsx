import { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Root from '../../components/RootContainer'
import Sidebar from '../../components/DEV/SidebarPM';
import RouteContextProvider from '../../context/RouteContext';
import Routes from './DEV.routes'

const ProjectManager = () => {



  return (
    <Root>
      <Sidebar />
      <RouteContextProvider>
        <MainContainer >
          <Routes />
        </MainContainer>
      </RouteContextProvider>
    </Root>
  );
}

export default ProjectManager