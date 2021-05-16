import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
  makeStyles, fade,
} from '@material-ui/core'
import {
  FiSearch
} from 'react-icons/fi'
import Moment from 'react-moment'
import { useState, useContext } from 'react'
import useTable from '../../../../hooks/useTable'
import { ProjectType2 } from '../../../../types'
import { v4 as setKey } from 'uuid'
import Loader from '../../../../components/Loader';
import { DataContext } from '../../DataContext'
import { useHistory } from 'react-router-dom'

// =====================>Component
const Table = () => {

  const { data } = useContext(DataContext)

  const history = useHistory()

  const records: any = (data.role === 'PM')
    ? data.projects.PM
    : (
      data.role === 'TL'
        ? data.projects.TL.map(project => project.projectRef)
        : data.projects.TL.map(project => project.projectRef)
    )

  const image = (id: string) => eval(id[id.length - 1].charCodeAt(0).toString().split('').join('+')) % 16

  let projects: any = []

  if (records.length !== 0)
    projects = records.map((project: any) => ({
      projectDesc: project.projectDesc,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      _id: project._id,
      startDate: project.startDate,
      endDate: project.endDate
    }))

  const css = useCSS()

  const headCell = [
    { id: 'projectId', label: 'ID' },
    { id: 'projectName', label: 'Title' },
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
                <TableRow key={setKey()} onClick={() => history.push(`projects/${project._id}-${image(project.projectId)}`)} >
                  <TableCell style={{ width: '18%' }}>{project.projectId}</TableCell>
                  <TableCell style={{ width: '22%' }}>{project.projectTitle}</TableCell>
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