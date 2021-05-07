import {
  Card,
  CardMedia, CardContent,
  Typography, MenuItem, OutlinedInput, InputAdornment,
  Select, makeStyles, FormControl, CardActionArea
} from '@material-ui/core'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import images from '../../../../../assets/images'
import shadow from '../../../../../constants/backgroundShadow'
import { DataContext } from '../../../DataContext'
import { ProjectPMType } from '../../../../../types'
import { useHistory } from 'react-router'

const ProjectCard = ({ project, index }: { project: ProjectPMType, index: number }) => {

  const history = useHistory()
  const css = useStyles()

  const trimDesc = (desc: string) => desc.length > 150 ? `${desc.substr(0, 150)}....` : desc

  return (
    <Card className={css.root}>
      <CardMedia
        component="img"
        alt={project.projectTitle}
        height="140"
        image={images[index]}
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
        <CardActionArea className={css.button} onClick={() => history.push(`projects/${project._id}-${index}`)}>
          &rarr;
      </CardActionArea>
      </div>
    </Card>
  )
}

export const ProjectCardFilter = ({ setRecords }: { setRecords: (...arg: any) => any }) => {

  const css = useStyles()

  const { data } = useContext(DataContext)

  const [searchBy, setSearchBy] = useState('projectTitle')

  const [filterFN, setFilterFN] = useState({
    fn: (item: ProjectPMType[]): ProjectPMType[] => item
  })

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFilterFN({
      fn: (item: ProjectPMType[]): ProjectPMType[] => {
        if (target.value === '')
          return item
        else
          return item.filter((x: any) => x[searchBy].toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }

  useEffect(() => {
    setRecords(filterFN.fn(data.projects.PM))
  }, [filterFN, data.projects.PM, setRecords])

  return (
    <div className={css.toolbox}>
      <FormControl variant="outlined" size="small">
        <Select
          labelId="project-search-label"
          id="employee-search"
          className={css.searchBy}
          value={searchBy}
          onChange={({ target }) => setSearchBy(`${target.value}`)}
        >
          <MenuItem value="projectTitle">Search by Title</MenuItem>
          <MenuItem value="projectId">Search by ID</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" style={{ flexGrow: 1 }}>
        <OutlinedInput
          id="employee-search"
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <FiSearch className={css.searchIcon} />
            </InputAdornment>
          }
          onChange={handleSearch}
        />
      </FormControl>
    </div>
  )
}

const ProjectCards = ({ projects }: { projects: ProjectPMType[] }) => {

  const css = useStyles()

  return (
    <div className={css.container}>
      {
        projects.map((project, index) => (<ProjectCard project={project} index={index} />))
      }
    </div>
  );
}

export default ProjectCards;

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
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
  },
  searchBy: {
    marginBottom: 10,
    [breakpoints.only('sm')]: {
      marginBottom: 0,
      marginRight: spacing(1.5)
    },
    [breakpoints.up('lg')]: {
      marginBottom: 0,
      marginRight: spacing(1.5)
    }
  },
  searchIcon: {
    color: palette.text.hint
  },
  toolbox: {
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.only('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    [breakpoints.up('lg')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }
}))