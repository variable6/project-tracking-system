import React, { useState } from 'react'
import {
  makeStyles,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Chip,
  IconButton,
  TextField,
  Divider,
  Button,
  Dialog,
  withStyles,
  fade,
  DialogContent,
  Slide,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import {
  FiSearch,
  FiMail,
  FiTrash2,
  FiEdit as EditIcon,
  FiX as CloseIcon,
  FiUserCheck
} from 'react-icons/fi'
import { v4 as setKey } from 'uuid'
import { TransitionProps } from '@material-ui/core/transitions'
//import context
import { AlertContext } from '../../context/AlertContext'
//------>importing hooks
import useTable from '../../hooks/useTable'
import useModal from '../../hooks/useProfileModal'
//importing components
import Card from '../Card'
import Loader from '../Loader'
//import configs
import axiosConfig from '../../config/axiosConfig'
import FormLoader from '../FormLoader'
import {
  EmployeeType as EmpType
} from '../../types'


// styling
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
  porfileContainer: {
    marginTop: theme.spacing(2),
    width: '75vw',
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.25),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(60)
    }
  },
  iconContainer: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.25),
    '& > button': {
      backgroundColor: theme.palette.common.white
    }
  },
  title: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1.25)}px ${theme.spacing(3)}px`
  },
  loaderContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99
  },
  noDataMesage: {
    textAlign: 'center',
    margin: theme.spacing(2),
    marginTop: theme.spacing(2.75)
  },
  totalCount: {
    display: 'flex',
    margin: `${theme.spacing(0.75)}px 0px ${theme.spacing(1.25)}px`,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    '& span': {
      fontWeight: 600
    }
  }
}))

const Popover = withStyles(theme => ({
  root: {
    zIndex: 99999999
  },
  scrollPaper: {
    backgroundColor: fade(theme.palette.background.paper, 0.1),
    [theme.breakpoints.up('sm')]: {
      backdropFilter: `blur(${theme.spacing(0.5)}px)`,
    }
  }
}))(Dialog)

// PropsTypes
interface PropsType {
  isLoading: boolean
  employees: EmpType[]
  curEmp: {
    curEmp: EmpType,
    addCurEmp: (val: EmpType) => any,
    clearCurEmp: () => any
  }
  form: {
    setOpen: () => any,
    setClose: () => any
  }
  fetchEmployees: () => void
  setGetInActive: (...args: any) => any
  getInActive: boolean
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


//components
const EmployeeTable = ({ employees, isLoading, curEmp, form, fetchEmployees, setGetInActive, getInActive }: PropsType) => {

  const css = useCSS()
  const isSM = useMediaQuery(useTheme().breakpoints.down('sm'))
  const { setAlert } = React.useContext(AlertContext)

  const headCell = [
    { id: 'employeeId', label: 'Empoylee Id' },
    { id: 'name', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'designation', label: 'Designation' }
  ]

  const [searchBy, setSearchBy] = useState('name')

  // ======================= Filter Function
  const [filterFN, setFilterFN] = useState({
    fn: (item: any) => item
  })
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
    recordsAfterPagingAndSorting,
    TblContainer,
    TblHead,
    TblPagination
  } = useTable({ records: employees, headCells: headCell, filterFN: filterFN })


  const dEmp = {
    data: {
      password: '',
      employeeId: ''
    },
    modal: {
      open: false
    }
  }
  const [deleteEmp, setDeleteEmp] = useState(dEmp)
  const [toActive, setToActive] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const openDeletePrompt = () => {
    setDeleteEmp(cur => ({
      ...cur, modal: { open: true }
    }))
    closeModal()
  }
  const onDeletePromptClose = () => {
    setDeleteEmp(dEmp)
    if (curEmp.curEmp.employeeId) {
      openModal()
    }
  }
  // deleteEmployee
  const deleteEmployee = () => {
    setIsSubmit(true)
    axiosConfig()
      .post(`hr/emp/${toActive ? 'active' : 'remove'}`, deleteEmp.data)
      .then(r => {
        fetchEmployees()
        setToActive(false)
        setIsSubmit(false)
        setDeleteEmp(dEmp)
        setAlert({
          open: true,
          message: r.data.message,
          type: r.data.type
        })
      })
      .catch(e => {
        if (e["response"]) {
          if (e['response']['data']) {
            const data = e.response.data
            setAlert({
              open: true,
              message: data.message,
              type: data.type
            })
          }
        } else {
          setAlert({
            open: true,
            message: 'Something went worng',
            type: 'error'
          })
        }
        setIsSubmit(false)
        setDeleteEmp(dEmp)
        setToActive(false)
      })
  }

  const {
    Modal,
    closeModal,
    openModal
  } = useModal({
    onClose: () => {
      closeModal()
      curEmp.clearCurEmp()
    }
  })
  // Profile
  const viewProfile = (employee: EmpType) => {
    curEmp.addCurEmp(employee)
    openModal()
  }

  const Popup = () => (
    <Modal>
      <div className={css.porfileContainer} >
        <Typography variant="h5" style={{ fontWeight: 600 }} color="secondary">
          {curEmp.curEmp.name}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 600 }} color="textPrimary">
          {curEmp.curEmp.employeeId}
        </Typography>
        <Chip
          label={curEmp.curEmp.designation}
          variant="default"
          style={{}}
        />
        <div className={css.iconContainer}>
          <IconButton aria-label="email" onClick={() => window.open(`mailto:${curEmp.curEmp.email}`, '_blank')}>
            <FiMail />
          </IconButton>
          {
            curEmp.curEmp.status === 'ACTIVE' ? (
              <IconButton aria-label="delete" onClick={openDeletePrompt}>
                <FiTrash2 />
              </IconButton>
            ) : (
              <IconButton
                aria-label="active-user"
                onClick={() => { setToActive(true); openDeletePrompt() }}
              >
                <FiUserCheck />
              </IconButton>
            )
          }
          <IconButton aria-label="edit" onClick={() => { form.setOpen(); closeModal() }}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </Modal>
  )

  return (
    <>
      <Card title="All Employees">
        <div style={{ position: 'relative' }}>
          {(employees.length === 0 && isLoading) && (<div className={css.loaderContainer}><Loader /></div>)}
          <Popover
            TransitionComponent={Transition}
            open={deleteEmp.modal.open}
            keepMounted
            onClose={onDeletePromptClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <div style={{ alignItems: 'center', justifyContent: 'space-between' }} className={css.title}>
              <Typography variant="h6" color="secondary" style={{ fontWeight: 600 }}>
                Are you sure?
              </Typography>
              <IconButton
                edge="end"
                onClick={onDeletePromptClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <DialogContent dividers style={{ position: 'relative' }}>
              {isSubmit && <FormLoader />}
              <Typography variant="body1" color="textPrimary">
                To {toActive ? 'activate' : 'drop'} the employee&nbsp;
                <strong>
                  {curEmp.curEmp.employeeId} - {curEmp.curEmp.name}
                </strong>
                , enter your password to confirm.
            </Typography>
              <TextField
                style={{ width: '100%', marginTop: 15, marginBottom: 15 }}
                variant="outlined"
                type="password"
                size='small'
                placeholder="Enter your password"
                value={deleteEmp.data.password}
                onChange={({ target }) => setDeleteEmp(cur => ({
                  ...cur,
                  data: {
                    password: target.value,
                    employeeId: curEmp.curEmp.employeeId
                  }
                }))}
              />
              <Divider />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 20, marginTop: 15 }}>
                <Button onClick={onDeletePromptClose}><strong>Not, sure</strong></Button>
                <Button
                  disableElevation color="primary"
                  disabled={deleteEmp.data.password ? false : true}
                  variant="contained"
                  onClick={deleteEmployee}
                >
                  <strong>Yes, i'm</strong>
                </Button>
              </div>
            </DialogContent>
          </Popover>
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
          {
            employees.length === 0 ? (
              <Typography variant="body1" className={css.noDataMesage} color="textPrimary">
                No employees {getInActive ? ' are droped' : 'hired'}.
              </Typography>
            ) : (
              <>
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {
                      recordsAfterPagingAndSorting().map(emp => (
                        <TableRow key={setKey()} onClick={() => viewProfile(emp)} >
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
              </>
            )
          }
          <Popup />
          <div className={css.totalCount}>
            <Typography variant="body1" color="textPrimary">
              Total no. of {getInActive ? 'in-active ' : ''}employees: <span>{employees.length}</span>
            </Typography>
          </div>
          <FormControlLabel
            control={
              <Switch checked={getInActive}
                onChange={() => { setGetInActive(!getInActive); fetchEmployees() }}
                color="primary"
              />
            }
            label="Get In-Active Employees"
          />
        </div>
      </Card>
      { isSM && <div style={{ height: 70 }} />}
    </>
  )
}

export default EmployeeTable