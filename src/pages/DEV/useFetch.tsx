import axiosConfig from '../../config/axiosConfig'
import { DataContext } from './DataContext'
import { useContext } from 'react'

export interface UseFetchType {
  fetchRoles: () => void
  fetchProjectsPM: () => void
  fetchEmployeesPM: () => void

}

const useFetch = (): UseFetchType => {

  const { dispatch } = useContext(DataContext)

  const fetchRoles = () => {
    axiosConfig()
      .get('/dev')
      .then(({ data }) => {
        dispatch.getRoles({
          isDev: true,
          isPM: data.isManager,
          isTL: data.isTL
        })
      })
      .catch((e) => console.log('Error while fetching roles'))
  }

  const fetchProjectsPM = () => {
    axiosConfig()
      .get('/pm/projects')
      .then(({ data }) => {
        dispatch.setProjectsPM(data)
      })
      .catch(() => console.log('Error while fetching projects'))
  }

  const fetchEmployeesPM = () => {
    axiosConfig()
      .get('/pm/emp')
      .then(({ data }) => {
        dispatch.setEmployees(data)
      })
      .catch(() => console.log('============================\nError while fetching employees\n============================'))
  }

  return ({
    fetchRoles,
    fetchProjectsPM,
    fetchEmployeesPM
  })
}

export default useFetch