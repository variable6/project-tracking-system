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
  startDate: Date
  endDate: Date
  manager: {
    _id: string,
    name: string
  }
}