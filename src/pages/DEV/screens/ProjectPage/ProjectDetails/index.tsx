import { useContext } from 'react'
import { DataContext } from '../../../DataContext'
import { makeStyles, Typography, fade } from "@material-ui/core";
import images from "../../../../../assets/images";

import { ProjectPMType } from '../../../../../types'
import PageContainer from '../../../layouts/PageContainer';

interface MatchParams {
  isExact: boolean
  params: any
  path: string
  url: string
}
const setBackground = (index: number) => ({
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.95) 100%), url("${images[index]}")`
})

const Index = ({ match }: { match: MatchParams }) => {

  const { projectId, imgIndex } = match.params

  const { data } = useContext(DataContext)

  const currentProject = data.projects.PM.filter((project: ProjectPMType) => project._id === projectId)[0]


  const css = useCSS()

  return (
    <PageContainer>
      <div className={css.backgroundImage} style={setBackground(imgIndex)}>
        <Typography variant="h4" component="h2">
          {currentProject.projectTitle}
        </Typography>
      </div>
    </PageContainer>
  );
}

export default Index

const useCSS = makeStyles(({ spacing, palette }) => ({
  backgroundImage: {
    padding: spacing(2),
    height: spacing(28),
    width: '100vw',
    backgroundSize: 'cover',
    'background-position': 'center',
    display: 'flex',
    flexDirection: 'column-reverse',
    '& h2': {
      color: fade(palette.background.paper, 0.9),
      fontWeight: 500
    }
  }
}))