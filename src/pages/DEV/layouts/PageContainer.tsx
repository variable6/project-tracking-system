import { makeStyles } from '@material-ui/core'
import React from 'react'


const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={useCSS().root}>
      {children}
    </div>
  )
}

export default PageContainer

const useCSS = makeStyles(({ breakpoints, mixins }) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100vw',
    [breakpoints.down('sm')]: {
      marginBottom: mixins.toolbar.minHeight
    }
  }
}))