import {
  useState,
  useEffect,
  useContext
} from 'react'
import { RouteContext } from '../../../../context/RouteContext'
import axiosConfig from '../../../../config/axiosConfig'
import setTitle from '../../../../constants/pageTitle'
import storageKeys from '../../../../constants/storageKeys'
import storage from '../../../../config/localStorageConfig'

import Table from './EmpTable'

import {
  EmployeeType
} from '../../../../types'


const pageName = 'Employees'

const Employees = () => {

  const route = useContext(RouteContext)

  const empLS = storage.get(storageKeys.employeeBDM)
  const [employees, setEmployees] = useState<EmployeeType[]>(empLS ? empLS : [])

  const fetchEmployees = () => {
    axiosConfig()
      .get('/bdm/emp')
      .then(({ data }) => {
        setEmployees(data)
        storage.add(storageKeys.employeeBDM, data)
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    fetchEmployees()
    setTitle(pageName)
    route.setPageTitle(pageName)
  }, [])



  return (
    <Table employees={employees} />
  );
}

export default Employees