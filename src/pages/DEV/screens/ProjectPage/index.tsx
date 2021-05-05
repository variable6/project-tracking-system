import { useContext, useEffect } from 'react'
import { DataContext } from '../../DataContext'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'
// Project screen
import ProjectPM from './ProjectPM'
import ProjectDEV from './ProjectDEV'
import ProjectTL from './ProjectTL'
import BreadCrumbs from '../../../../components/Breadcrumbs'
import PageContainer from '../../layouts/PageContainer'
import useFetch from '../../useFetch'
// import components


const PAGENAME = 'Projects'

const projectScreen = {
  DEV: <ProjectDEV />,
  PM: <ProjectPM />,
  TL: <ProjectTL />
}

const ProjectPage = () => {

  const { data } = useContext(DataContext)
  const { fetchProjectsPM } = useFetch()
  const css = useCSS()

  useEffect(() => {
    fetchProjectsPM()
  }, [])

  return (
    <PageContainer>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h5">
            {PAGENAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={css.root}>
        <BreadCrumbs currentPage={PAGENAME} links={[{ label: 'Dashboard', path: '/' }]} />
        {projectScreen[data.role]}
      </div>
    </PageContainer>
  )
}

export default ProjectPage


const useCSS = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    padding: spacing(3),
    [breakpoints.down('xs')]: {
      padding: spacing(2)
    }
  }
}))