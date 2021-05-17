// import { useState } from "react";
import SidebarBDM from "../../components/BDM/Sidebar";
import MainContainer from "../../components/MainContainer";
import ProfilePage from "../../components/ProfilePage";
import RootContainer from "../../components/RootContainer";
import RouteContextProvider from "../../context/RouteContext";
import ProfilePageContext from "../../context/ProfilePageContext";
import BDMroutes from "./BDM.routes";


const BDM = () => {


  return (
    <RootContainer>
      <ProfilePageContext>
      <RouteContextProvider>
          <SidebarBDM />
          <MainContainer >
            <BDMroutes />
            <ProfilePage />
        </MainContainer>
      </RouteContextProvider>
      </ProfilePageContext>
    </RootContainer>
  );
}

export default BDM;