import useAPP from './useApp';
import Root from '../../components/RootContainer'
import Routes from './DEV.routes'
import useStore from '../../data/useStore'
import Sidebar from './layouts/Sidebar'


const ProjectManager = () => {

  const { StoreProvider } = useStore()

  const { AppContextProvider } = useAPP()

  return (
    <Root>
      <StoreProvider>
        <AppContextProvider>
          <Sidebar />
          <Routes />
        </AppContextProvider>
      </StoreProvider>
    </Root>
  );
}

export default ProjectManager