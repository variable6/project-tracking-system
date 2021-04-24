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
  manager: {
    _id: string,
    name: string
  }
}

export interface ProjectType2 {
  _id: string
  projectId: string
  projectTitle: string
  projectDesc: string
  startDate: Date
  endDate: Date
  manager_id: string,
  managerName: string
}

export interface UserType {
  date: string | Date
  designation: "HR" | 'DEV' | 'BDM'
  email: string
  employeeId: string
  name: string
  projects: any[]
  status: "ACTIVE" | "IN-ACTIVE"
  tasks: any[]
  __v: number
  _id: string
}


export interface InitialStateType {
  projects: ProjectType2[]
}