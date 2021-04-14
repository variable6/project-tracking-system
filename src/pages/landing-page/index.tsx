import { useEffect } from 'react'
import Login from './Login'

const LandingPage = () => {

  useEffect(() => {
    document.title = 'WorkSpace - Project Tracking System [PTS]'
  }, [])


  return (
    <>
      <Login />
    </>
  )
}

export default LandingPage