import {
  Card,
  CardMedia, CardContent,
  Typography, CardActions,
  Button, makeStyles, IconButton, CardActionArea
} from '@material-ui/core'
import { useContext } from 'react'
import { FiArrowRight as NextIcon } from 'react-icons/fi'

import images from '../../../../../assets/images'
import shadow from '../../../../../constants/backgroundShadow'
import { DataContext } from '../../../DataContext'
import { ProjectPMType } from '../../../../../types'
import { useHistory } from 'react-router'

const ProjectCard = ({ project }: { project: ProjectPMType }) => {

  const history = useHistory()
  const css = useStyles()

  const trimDesc = (desc: string) => desc.length > 150 ? `${desc.substr(0, 150)}....` : desc

  return (
    <Card className={css.root}>
      <CardMedia
        component="img"
        alt={project.projectTitle}
        height="140"
        image={images[12]}
        title={project.projectTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '90%' }}>
          {project.projectTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {trimDesc(project.projectDesc)}
        </Typography>
      </CardContent>
      <div className={css.btnContainer}>
        <CardActionArea className={css.button} onClick={() => history.push(`projects/${project._id}`)}>
          &rarr;
      </CardActionArea>
      </div>
    </Card>
  )
}

const ProjectCards = () => {

  const css = useStyles()
  const { data } = useContext(DataContext)

  const loop = (Array.from(Array(15).keys()))

  return (
    <div className={css.container}>
      {
        data.projects.PM.map(project => (<ProjectCard project={project} />))
      }
    </div>
  );
}

export default ProjectCards;

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    maxWidth: 570,
    minWidth: 210,
    boxShadow: 'none',
    filter: shadow
  },
  container: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(40)}px, 1fr))`,
    'grid-gap': spacing(2.25),
    marginTop: spacing(2.5)
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: spacing(2),
    marginBottom: spacing(2)
  },
  button: {
    width: 'auto',
    borderRadius: spacing(10),
    fontSize: spacing(4),
    padding: `0px ${spacing(2.75)}px ${spacing(0.35)}px ${spacing(2.75)}px`,
    display: 'gird',
    placeItems: 'center',
    color: palette.text.primary,
    backgroundColor: palette.common.white
  }
}))