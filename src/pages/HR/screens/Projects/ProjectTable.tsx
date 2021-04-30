import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  withStyles,
  Drawer, fade,
  Typography, IconButton,
} from '@material-ui/core'
import {
  FiSearch,
  FiX
} from 'react-icons/fi'
import Moment from 'react-moment'
import { useState, useEffect } from 'react'
import useTable from '../../../../hooks/useTable'
import { ProjectType2 } from '../../../../types'
import { v4 as setKey } from 'uuid'
import Loader from '../../../../components/Loader';
import Card from '../../../../components/Card'

interface PropsType {
  projects: ProjectType2[]
}


const Model = withStyles(() => ({
  root: {
    display: ', TextFieldgrid',
    placeItems: 'center',
  },
  paper: {
    marginBottom: 'auto',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
    overflow: 'auto'
  }
}))(Drawer)

// =====================>Component
const Table = ({ projects }: PropsType) => {

  const css = useCSS()

  const [curProject, setCurProject] = useState<ProjectType2 | null>(null)


  const closePopup = () => {
    setCurProject(null)
  }

  useEffect(() => {

    const handleClick = ({ target }: any) => {

      if (target.id && target.id === 'project-info-modal')
        closePopup()
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const headCell = [
    { id: 'projectId', label: 'ID' },
    { id: 'projectName', label: 'Title' },
    { id: 'managerName', label: 'Manager' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' }
  ]

  const getDate = (date: Date) => (
    <Moment format="MMM DD, YYYY">{date}</Moment>
  )

  const [filterFN, setFilterFN] = useState({
    fn: (item: any) => item
  })

  const [searchBy, setSearchBy] = useState('projectTitle')
  // ======================= initializing filterFunc
  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFN({
      fn: item => {
        if (target.value === '')
          return item
        else
          return item.filter((x: any) => x[searchBy].toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable({
    records: projects,
    headCells: headCell,
    filterFN
  })

  return (
    <>
      <div className={css.toolbar}>
        <div className={css.subFlex} style={{ marginTop: 10 }}>
          <FormControl variant="outlined" size="small">
            <Select
              labelId="employee-search-label"
              id="employee-search"
              className={css.searchBy}
              value={searchBy}
              onChange={({ target }) => setSearchBy(`${target.value}`)}
            >
              <MenuItem value="projectId">Search by ID</MenuItem>
              <MenuItem value="projectTitle">Search by Title</MenuItem>
              <MenuItem value="managerName">Search by Manager</MenuItem>
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
      </div>
      <div style={{ position: 'relative' }}>
        {projects.length === 0 && (<div className={css.loaderContainer}><Loader /></div>)}
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map((project: ProjectType2) => (
                <TableRow key={setKey()} onClick={() => setCurProject(project)} >
                  <TableCell style={{ width: '18%' }}>{project.projectId}</TableCell>
                  <TableCell style={{ width: '22%' }}>{project.projectTitle}</TableCell>
                  <TableCell style={{ width: '22%' }}>{project.managerName}</TableCell>
                  <TableCell style={{ width: '19%' }}>
                    {project.startDate ? getDate(project.startDate) : '-N/A-'}
                  </TableCell>
                  <TableCell style={{ width: '19%' }}>
                    {project.endDate ? getDate(project.endDate) : '-N/A-'}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
      <Model
        open={curProject !== null}
        anchor="right"

      >
        <section className={css.container} id="project-info-modal">
          <div className={css.modal}>
            <Card title="Project" marginTop="0" noshadow={true}>
              <section className={css.section}>
                <div>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Project ID
                    </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {curProject?.projectId}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Project Title
                    </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {curProject?.projectTitle}
                  </Typography>
                </div>
              </section>
            </Card>
            <Card title="Description" marginTop="0" noshadow={true}>
              <Typography variant="body1"
                style={{ whiteSpace: 'pre-line' }} color="textPrimary">
                {curProject?.projectDesc}
              </Typography>
            </Card>
            <Card title="Details" marginTop="0" noshadow={true}>
              <section className={css.section}>
                <div>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Start Date
                    </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {curProject?.startDate ? getDate(curProject?.startDate) : '-N/A-'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" component="p" color="textSecondary">
                    End Date
                      </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {curProject?.endDate ? getDate(curProject?.endDate) : '-N/A-'}
                  </Typography>
                </div>
              </section>
              <section className={css.section} style={{ marginTop: 15 }}>
                <div>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Project Manager
                      </Typography>
                  <Typography variant="h6" color="textPrimary">
                    {curProject?.managerName}
                  </Typography>
                </div>
              </section>
            </Card>
            <div className={css.btnClose}>
              <IconButton className={css.closeBtn} onClick={closePopup} >
                <FiX />
              </IconButton>
            </div>
          </div>
        </section>
      </Model>
    </>
  );
}



export default Table;

const useCSS = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  subFlex: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  subheading: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.only('sm')]: {
      marginBottom: 0,
      marginRight: theme.spacing(1.5)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
      marginRight: theme.spacing(1.5)
    }
  },
  searchIcon: {
    color: theme.palette.text.hint
  },
  searchBy: {
    marginBottom: 10,
    [theme.breakpoints.only('sm')]: {
      marginBottom: 0,
      marginRight: theme.spacing(1.5)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
      marginRight: theme.spacing(1.5)
    }
  },
  container: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up(theme.spacing(105.01))]: {
      bacKdropFilter: 'blur(5px)'
    },
    overflow: 'auto'
  },
  loaderContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  },
  section: {
    display: 'flex',
    '& > div': {
      flexGrow: 1,
      '&:last-child': {
        flexGrow: 2
      }
    },
    [theme.breakpoints.down(512)]: {
      flexDirection: 'column',
      gap: theme.spacing(2)
    }
  },
  btnCtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(1),
    gap: theme.spacing(1.5)
  },
  btnEdit: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  btnDelete: {
    color: theme.palette.error.main,
    fontWeight: 600,
    backgroundColor: fade(theme.palette.text.disabled, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.text.disabled, 0.1)
    }
  },
  modal: {
    width: theme.spacing(100),
    [theme.breakpoints.down(theme.spacing(105.01))]: {
      width: '95vw'
    },
  },
  btnClose: {
    display: 'grid',
    placeItems: 'center',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up(theme.spacing(105.01))]: {
      display: 'none'
    }
  },
  closeBtn: {
    backgroundColor: theme.palette.background.paper
  }
}))