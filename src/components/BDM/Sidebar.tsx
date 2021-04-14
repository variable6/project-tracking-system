import Sidebar from "../Sidebar";


const SidebarBDM = (props: { setMobileOpen: () => void, mobileOpen: boolean }) => {
  return (
    <Sidebar
      setMobileOpen={props.setMobileOpen}
      mobileSidebar={<></>}
      mobileOpen={props.mobileOpen}
    >
      bdm
    </Sidebar>
  );
}

export default SidebarBDM;