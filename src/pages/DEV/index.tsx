// import { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Root from '../../components/RootContainer'
import Sidebar from '../../components/DEV/SidebarPM';
import RouteContextProvider from '../../context/RouteContext';
import Routes from './DEV.routes'
import ProfilePageContext from '../../context/ProfilePageContext';
import useStore from '../../data/useStore'

const ProjectManager = () => {

  const { StoreProvider } = useStore()

  return (
    <Root>
      <ProfilePageContext>
        <StoreProvider>
          <Sidebar />
          <RouteContextProvider>
            <MainContainer >
              <Routes />
            </MainContainer>
          </RouteContextProvider>
        </StoreProvider>
      </ProfilePageContext>
    </Root>
  );
}

export default ProjectManager