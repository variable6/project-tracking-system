import { useState } from "react";
import SidebarBDM from "../../components/BDM/Sidebar";
import MainContainer from "../../components/MainContainer";
import RootContainer from "../../components/RootContainer";
import RouteContextProvider from "../../context/RouteContext";
import BDMroutes from "./BDM.routes";


const BDM = () => {

  const [opensidebar, setOpensidebar] = useState(false)

  const setMobileSidebar = () => {
    setOpensidebar(!opensidebar)
  }

  return (
    <RootContainer>
      <RouteContextProvider>
        <SidebarBDM mobileOpen={opensidebar} setMobileOpen={setMobileSidebar} />
        <MainContainer setMobileOpen={setMobileSidebar}>
          <BDMroutes />
        </MainContainer>
      </RouteContextProvider>
    </RootContainer>
  );
}

export default BDM;