import Sidebar from "../Sidebar"

// Props types
interface Props {
  mobileOpen: boolean
  setMobileOpen: any
}


const SidebarPM = ({ mobileOpen, setMobileOpen }: Props) => {

  const mobileSidebar = (
    <>
    </>
  )

  return (
    <Sidebar mobileSidebar={mobileSidebar} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} >
      sd
    </Sidebar>
  );
}

export default SidebarPM