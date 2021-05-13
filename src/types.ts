export interface EmployeeType {
  date: string
  designation: "HR" | 'DEV' | 'BDM'
  email: string
  employeeId: string
  name: string
  status: "ACTIVE" | 'IN-ACTIVE'
  _id: string
}

export interface ProjectType {
  _id: string
  projectId: string
  projectTitle: string
  projectDesc: string
  startDate: Date
  endDate: Date
  last_update: Date
  isCompleted: boolean
  manager: {
    _id: string,
    name: string
  } | null
}

export interface ProjectType2 {
  _id: string
  projectId: string
  projectTitle: string
  projectDesc: string
  startDate: Date
  endDate: Date
  last_update: Date
  isCompleted: boolean
  manager_id: string | null,
  managerName: string | null
}

export interface UserType {
  date: string | Date
  designation: "HR" | 'DEV' | 'BDM'
  email: string
  employeeId: string
  name: string
  status: "ACTIVE" | "IN-ACTIVE"
  __v: number
  _id: string
}

export interface ProjectPMType {
  endDate: Date | null,
  managerId: string,
  projectDesc: string,
  projectId: string,
  projectTitle: string,
  startDate: Date,
  _id: string
}

export interface InitialStateType {
  projects: {
    PM: ProjectPMType[],
    TL: ProjectPMType[],
    DEV: ProjectPMType[]
  }
  role: 'DEV' | 'TL' | 'PM'
  roleList: {
    isPM: boolean,
    isTL: boolean,
    isDev: boolean
  }
  showRolePopup: boolean
  projectView: 'LIST' | 'GRID' | 'TABLE'
  employees: EmployeeType[]
}

export interface RouteListType {
  path: string
  component: (params: any) => React.ReactNode
  label: string
  icon: React.ReactNode
  isInBottomNav: boolean
}