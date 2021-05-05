import { InitialStateType } from '../../../types'
import storage from '../../../config/localStorageConfig'
import { appStorageKey } from '../../../constants/storageKeys/appStorageKey'


const stateLS = storage.get(appStorageKey)

const initialState: InitialStateType = stateLS ? stateLS : {
  projects: {
    PM: []
  },
  role: 'DEV',
  roleList: {
    isDev: true,
    isPM: false,
    isTL: false
  },
  showRolePopup: false,
  projectView: 'LIST'
}

export default initialState