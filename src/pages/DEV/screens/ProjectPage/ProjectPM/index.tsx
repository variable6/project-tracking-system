import { makeStyles, Typography } from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/lab'
import { useContext, useState } from 'react'
import {
  FiList as ListIcon,
  FiLayout as TableIcon,
  FiGrid as GridIcon
} from 'react-icons/fi'
import Card from '../../../../../components/Card'
import { ProjectPMType } from '../../../../../types'
import { DataContext } from '../../../DataContext'
import ProjectCard, { ProjectCardFilter } from './ProjectCards'


const ProjectPM = () => {

  const css = useCSS()

  const { dispatch, data } = useContext(DataContext)

  const [filteredProjects, setFilteredProjects] = useState<ProjectPMType[]>([])

  const viewHandler = (val: string) => {
    if (val === 'GRID')
      dispatch.changeProjectView('GRID')
    else if (val === 'LIST')
      dispatch.changeProjectView('LIST')
    else if (val === 'TABLE')
      dispatch.changeProjectView('TABLE')
  }

  return (
    <>
      <Card title="Projects">
        <div className={css.toolbox}>
          <Typography variant="subtitle1" component="h6" color="textPrimary" >
            Filters
          </Typography>
          <ToggleButtonGroup exclusive value={data.projectView}
            onChange={(e, newLayout) => { viewHandler(newLayout) }}>
            <ToggleButton value="LIST" aria-label="List Layout">
              <ListIcon className={css.icon} />
            </ToggleButton>
            <ToggleButton value="GRID" aria-label="Grid Layout">
              <GridIcon className={css.icon} />
            </ToggleButton>
            <ToggleButton value="TABLE" aria-label="Table Layout">
              <TableIcon className={css.icon} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {data.projectView === 'GRID' && <ProjectCardFilter setRecords={setFilteredProjects} />}
      </Card>
      {data.projectView === 'GRID' && <ProjectCard projects={filteredProjects} />}
    </>
  )
}

export default ProjectPM

const useCSS = makeStyles(({ palette, spacing }) => ({
  icon: {
    color: palette.secondary.light,
    fontSize: spacing(2.5)
  },
  toolbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5),
    '& > h6': {
      fontWeight: 600,
      fontSize: '1.25rem'
    }
  }
}))