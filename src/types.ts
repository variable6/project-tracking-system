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
  status: "ACTIVE" | "IN-ACTIVE"
  __v: number
  _id: string
}

// endDate: null
// managerId: "608c384014b4d50015057ccb"
// projectDesc: "Vestibulum velit velit, pulvinar quis finibus ut, scelerisque a odio. Mauris pulvinar lacus vel felis condimentum, quis maximus dolor sodales. Proin id ex quis nisi lacinia ultrices. Quisque interdum nunc ac volutpat laoreet. Suspendisse dictum quis nibh eu euismod. Fusce mattis posuere nibh. Nunc vel venenatis erat, a volutpat ipsum. Pellentesque vehicula est molestie tellus posuere rhoncus. Donec dictum libero in cursus interdum.\n\nDonec id ex imperdiet, eleifend sapien a, sollicitudin erat. Duis varius erat posuere libero auctor, ac facilisis nisl elementum. Aliquam erat volutpat. Etiam dignissim enim enim, vitae efficitur risus iaculis eget. Pellentesque euismod laoreet sem, et viverra turpis. Sed rhoncus condimentum ante, a vulputate sapien pharetra sit amet. Aliquam ante magna, malesuada scelerisque neque vestibulum, accumsan blandit augue. Maecenas sem mauris, rutrum vel tortor sit amet, consequat pellentesque dui. Ut sagittis lorem ipsum, quis lacinia nisl feugiat eu. Curabitur malesuada maximus hendrerit. Suspendisse auctor, nibh ut consectetur eleifend, neque turpis ultricies leo, non tristique augue sapien blandit quam. Donec maximus dolor quam, eu tempor urna elementum eget. Vestibulum in pretium odio, at efficitur erat. Morbi vulputate mi odio, a ullamcorper turpis porta id."
// projectId: "HMCDF2"
// projectTitle: "Hotel Management System"
// startDate: "2021-05-02T13:22:06.081Z"
// __v: 0
// _id: "608ea77eae53950015688439"

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

  }
  role: 'DEV' | 'TL' | 'PM'
  roleList: {
    isPM: boolean,
    isTL: boolean,
    isDev: boolean
  }
  showRolePopup: boolean
  projectView: 'LIST' | 'GRID' | 'TABLE'
}

export interface RouteListType {
  path: string
  component: (params: any) => React.ReactNode
  label: string
  icon: React.ReactNode
  isInBottomNav: boolean
}