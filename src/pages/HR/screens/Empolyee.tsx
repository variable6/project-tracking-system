import * as React from 'react'
// importing context
import { RouteContext } from '../../../context/RouteContext'
import { AuthContext } from '../../../context/AuthContext'
// importing components
import Breadcrumbs from '../../../components/Breadcrumbs'
import Table from '../../../components/HR/EmployeeTable'
import Form from '../../../components/HR/EmployeeForm'
//import config
import storage from '../../../config/localStorageConfig'
import axiosConfig from '../../../config/axiosConfig'
//import keys
import keys from '../../../constants/storageKeys'
import {
  EmployeeType
} from '../../../types'

//styles

//component
const Empolyee = () => {

  const route = React.useContext(RouteContext)
  const { user } = React.useContext(AuthContext)

  const initCurEmp: EmployeeType = {
    employeeId: '',
    name: '',
    email: '',
    designation: 'DEV',
    date: '',
    status: 'ACTIVE',
    _id: ''
  }

  const empLS = storage.get(keys.employees)
  const inActiveEmpLS = storage.get(keys.inActiveEmp)

  const [employees, setEmployees] = React.useState<EmployeeType[]>(empLS ? empLS : [])
  const [InActiveEmps, setInActiveEmps] = React.useState<EmployeeType[]>(inActiveEmpLS ? inActiveEmpLS : [])

  const [curEmp, setCurEmp] = React.useState<EmployeeType>(initCurEmp)

  const [openForm, setOpenForm] = React.useState(false)

  const [getInActive, setGetInActive] = React.useState(false)

  const setOpen = () => setOpenForm(true)
  const setClose = () => setOpenForm(false)
  const toggleForm = () => setOpenForm(c => !c)

  const clearCurEmp = () => setCurEmp(initCurEmp)

  const addCurEmp = (val: EmployeeType) => setCurEmp(val)

  const pageName = 'Employees'

  const axios = axiosConfig()

  // fetching data
  const fetchEmployees = () => {
    navigator.onLine && axios.get('hr/emp/inactive')
      .then(({ data }) => {
        storage.add(keys.inActiveEmp, data)
        setInActiveEmps(data)
      })
      .catch(err => console.warn(err))
    navigator.onLine && axios
      .get('hr/emp')
      .then(({ data }) => {
        data = data.filter((emp: EmployeeType) => emp.employeeId !== user.employeeId)
        storage.add(keys.employees, data)
        setEmployees(data)
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    fetchEmployees()
    route.setContext({
      ...route.context,
      pageTitle: pageName
    })
    document.title = `WorkSpace | ${pageName}`
  }, [])



  return (
    <>
      <Breadcrumbs
        currentPage={pageName} links={[{ path: '/', 'label': 'Dashboard' }]}
      />
      <Form
        open={openForm} toggleForm={toggleForm} curEmp={curEmp}
        curEmpHandler={{ add: addCurEmp, clear: clearCurEmp }}
        fetchEmployees={fetchEmployees}
      />
      <Table
        setGetInActive={setGetInActive}
        getInActive={getInActive}
        employees={getInActive ? InActiveEmps : employees}
        curEmp={{ curEmp, addCurEmp, clearCurEmp }}
        form={{ setClose, setOpen }}
        fetchEmployees={fetchEmployees}
      />
    </>
  )
}

export default Empolyee