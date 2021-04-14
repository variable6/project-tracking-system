import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core'
import {
  FiSearch
} from 'react-icons/fi'
import { useState } from 'react'
import Card from '../../../../components/Card'
import useTable from '../../../../hooks/useTable'
import { EmployeeType } from '../../../../types'
import { v4 as setKey } from 'uuid'
import Loader from '../../../../components/Loader';

interface PropsType {
  employees: EmployeeType[]
}

// =====================>Component
const EmpTable = ({ employees }: PropsType) => {

  const css = useCSS()

  const headCell = [
    { id: 'employeeId', label: 'Empoylee Id' },
    { id: 'name', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'designation', label: 'Designation' }
  ]

  const [filterFN, setFilterFN] = useState({
    fn: (item: any) => item
  })

  const [searchBy, setSearchBy] = useState('name')
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
    records: employees,
    headCells: headCell,
    filterFN
  })

  return (
    <Card title="Employees" >
      <div className={css.toolbar}>
        <div className={css.subFlex} style={{ marginTop: 10 }}>
          <Typography
            variant="body1" style={{ fontWeight: 600 }} className={css.subheading}
          >
            Filters
            </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              labelId="employee-search-label"
              id="employee-search"
              className={css.searchBy}
              value={searchBy}
              onChange={({ target }) => setSearchBy(`${target.value}`)}
            >
              {
                headCell.map(item => (
                  <MenuItem key={setKey()} value={item.id}>
                    Search by {item.label}
                  </MenuItem>
                ))
              }
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
        {employees.length === 0 && (<div className={css.loaderContainer}><Loader /></div>)}
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(emp => (
                <TableRow key={setKey()} onClick={() => null} >
                  <TableCell style={{ width: '20%' }}>{emp.employeeId}</TableCell>
                  <TableCell style={{ width: '35%' }}>{emp.name}</TableCell>
                  <TableCell style={{ width: '30%' }}>{emp.email}</TableCell>
                  <TableCell style={{ width: '25%' }}>{emp.designation}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
    </Card>
  );
}

export default EmpTable;

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
  loaderContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2
  }
}))