import * as React from 'react'
import {
  makeStyles
} from '@material-ui/core'
import Appbar from './Appbar'
//import constants
import appbarHeight from '../constants/appbarHeight'

// styles
const useCSS = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1.5),
    marginTop: appbarHeight,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.mixins.toolbar.minHeight
    },
    position: 'relative'
  }
}))

// Props Type
interface Props {
  children: React.ReactNode
}
// component
const MainContainer = React.memo(function MainContainer({ children }: Props) {
  return (
    <div style={{ flexGrow: 1, maxWidth: '100vw' }}>
      <Appbar />
      <main className={useCSS().container}>
        {children}
      </main>
    </div>
  )
})
// Exporting Component
export default MainContainer