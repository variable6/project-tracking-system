import DataContextProvider from './DataContext';
import Root from '../../components/RootContainer'
import Routes from './DEV.routes'
import Sidebar from './layouts/Sidebar'
import BottomNavBar from './layouts/BottonNavBar'


const ProjectManager = () => {

  return (
    <Root>
      <DataContextProvider>
        <Sidebar />
        <Routes />
        <BottomNavBar />
      </DataContextProvider>
    </Root>
  );
}

export default ProjectManager