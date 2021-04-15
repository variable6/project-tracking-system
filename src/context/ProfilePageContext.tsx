import {
  createContext,
  useState,
  ReactNode
} from 'react'

interface ProfilePageType {
  isProfileOpen: boolean
  openProfile: () => void
  closeProfile: () => void
}

const ProfileContext = createContext<ProfilePageType>({
  isProfileOpen: false,
  openProfile: () => { },
  closeProfile: () => { }
})

const ProfilePageContext = (props: { children: ReactNode }) => {

  const [state, setState] = useState(false)


  const openProfile = () => {
    setState(true)
  }
  const closeProfile = () => {
    setState(false)
  }

  return (
    <ProfileContext.Provider value={{ isProfileOpen: state, openProfile, closeProfile }} >
      {props.children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext }

export default ProfilePageContext;