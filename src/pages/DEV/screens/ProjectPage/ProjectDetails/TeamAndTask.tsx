import {
  FormControl,
  makeStyles,
  OutlinedInput,
  InputAdornment,
  TextField, Chip, Radio,
  RadioGroup, FormControlLabel,
  FormGroup, Checkbox, Typography, Divider,
  Accordion, AccordionSummary, AccordionDetails, AccordionActions, Select, MenuItem
} from '@material-ui/core'

import {
  Skeleton
} from '@material-ui/lab'
import moment from 'moment'

import { useContext, useEffect, useState, ChangeEvent, } from 'react'
import {
  FiEdit as EditIcon,
  FiXCircle as CloseIcon,
  FiWifiOff as OfflineIcon,
  FiChevronDown as ExpandMoreIcon,
  FiPlusCircle as AddIcon,
  FiTrash2 as DeleteIcon,
  FiSearch
} from 'react-icons/fi'
import { v4 as setKey } from 'uuid'

import Button from '../../../../../components/Button'
import Card from "../../../../../components/Card"
import axiosConfig from '../../../../../config/axiosConfig'
import { AlertContext } from '../../../../../context/AlertContext'
import { AuthContext } from '../../../../../context/AuthContext'
import { DataContext } from '../../../DataContext'


const priorityColor = {
  LOW: '#f4d140',
  NORMAL: '#FFA500',
  HIGH: '#CE2029'
}

const statusColor = {
  NOT_STARTED: '#EA3C53',
  ACTIVE: '#29ab87',
  ON_HOLD: '#3a3a3a',
  COMPLETED: '#0CAFFF',
  BACKLOG: '#0d0d0d'
}

const status = {
  NOT_STARTED: 'Not Started',
  ACTIVE: 'Active',
  ON_HOLD: 'On-hold',
  COMPLETED: 'Completed',
  BACKLOG: 'Backlog'
}


interface FormType {
  teamLeader: string
  team: string[]
}

interface TaskType {
  priority: "NORMAL" | "HIGH" | "LOW"
  projectRef: string
  createdDate: Date
  status: "NOT_STARTED" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "BACKLOG"
  taskDesc: string
  __v: number
  _id: string
}


const Loader = () => (
  <>
    <Skeleton variant="text" height={110} />
    <Skeleton variant="rect" style={{ borderRadius: 7 }} width="100%" height={210} />
  </>
)


const ProjectTeam = ({ project_id }: { project_id: string }) => {

  const { data } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const { openAlert } = useContext(AlertContext)

  const css = useCSS()
  const classes = useStyles()


  const getDate = (date: Date) => moment(date).format('MMM DD, YYYY')

  const [state, setState] = useState({
    teamLeader: 'none',
    team: [],
    tasks: [],
    employees: data.employees.map(emp => ({
      name: `${emp.name} - ${emp.employeeId}`,
      id: emp._id
    })),
    developers: data.employees.map(emp => ({
      name: `${emp.name} - ${emp.employeeId}`,
      id: emp._id
    })).filter(emp => emp.id !== user._id),
    showDeltails: true,
    isTeamLoading: true,
    isTaskLoading: true,
    editTaskView: false,
    isNewTask: true
  })

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [form, setForm] = useState<FormType>({
    teamLeader: 'none',
    team: []
  })

  const [taskForm, setTaskForm] = useState({
    createdDate: (new Date()),
    taskDesc: '',
    status: 'NOT_STARTED',
    priority: 'NORMAL',
    projectRef: '',
    __v: 0,
    _id: ''
  })

  const closeEdit = () => {
    setState(cur => ({ ...cur, showDeltails: true }))
    setForm({
      teamLeader: state.teamLeader,
      team: state.team.map((member: any) => member.devRef)
    })
  }

  const openEditView = () => {
    setState(cur => ({ ...cur, showDeltails: false }))
  }


  const teamOptions = [{
    label: 'Edit',
    onClick: () => {
      if (state.showDeltails)
        openEditView()
      else
        closeEdit()
    },
    icon: state.showDeltails ? <EditIcon /> : <CloseIcon />
  }]

  const cardOptions = data.role === 'PM' ? teamOptions : []

  const fetchTeams = () => {
    setState(cur => ({ ...cur, isTeamLoading: true }))
    axiosConfig()
      .get(`/pm/teams/${project_id}`)
      .then((res) => {
        if (res.data.length) {
          setState(cur => ({
            ...cur,
            teamLeader: res.data[0].teamLeader,
            team: res.data[0].teamMembers,
            isTeamLoading: false
          }))
          setForm(cur => ({
            ...cur,
            teamLeader: res.data[0].teamLeader,
            team: res.data[0].teamMembers.map((member: any) => member.devRef)
          }))
        }
        else
          setState(cur => ({ ...cur, isTeamLoading: false }))
      })
      .catch(() => {
        console.log('Error while fetching teams')
        setState(cur => ({ ...cur, isTeamLoading: false }))
      })
  }

  const fetchTasks = () => {
    setState(cur => ({ ...cur, isTaskLoading: true }))
    axiosConfig()
      .get(`/pm/tasks/${project_id}`)
      .then(res => {
        setState(cur => ({
          ...cur,
          isTaskLoading: false,
          tasks: res.data
        }))
      })
      .catch(() => {
        console.log('Error while fetching teams')
        setState(cur => ({ ...cur, isTaskLoading: false }))
      })
  }

  const formSubmitHandler = () => {
    setState(cur => ({ ...cur, isTeamLoading: true }))
    if (form.team.length === 0)
      return openAlert({
        type: 'error',
        message: 'Team must contain atleast one team member'
      })
    else if (form.teamLeader.length === 0) return openAlert({
      type: 'error',
      message: 'Team must have a team leader'
    })
    axiosConfig()
      .post('/pm/team/update', {
        projectRef: project_id,
        teamLeader: form.teamLeader,
        teamMembers: form.team.map(member => ({ devRef: member }))
      })
      .then(({ data }) => {
        openAlert({
          type: data.type,
          message: data.message
        })
        closeEdit()
        fetchTeams()
      })
      .catch(() => openAlert({
        type: 'error',
        message: 'Error while creating/ updating team'
      }))
  }

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '')
      setState(cur => ({
        ...cur,
        employees: data.employees.map(emp => ({
          name: `${emp.name} - ${emp.employeeId}`,
          id: emp._id
        }))
      }))
    else
      setState(cur => ({
        ...cur,
        employees: cur.employees.filter(employee => employee.name.toLowerCase().includes(target.value.toLowerCase()))
      }))
  }

  const handleDevSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '')
      setState(cur => ({
        ...cur,
        developers: data.employees.map(emp => ({
          name: `${emp.name} - ${emp.employeeId}`,
          id: emp._id
        })).filter(emp => emp.id !== user._id)
      }))
    else
      setState(cur => ({
        ...cur,
        developers: data.employees.map(emp => ({
          name: `${emp.name} - ${emp.employeeId}`,
          id: emp._id
        })).filter(employee => employee.name.toLowerCase().includes(target.value.toLowerCase()))
      }))
  }

  const getTeamLeader = () => {
    const emp = data.employees.filter(emp => emp._id === form.teamLeader)
    if (emp.length)
      return `${emp[0].name} - ${emp[0].employeeId}`
    return 'None'
  }

  const getEmployeeName = (id: string) => {
    const emp = data.employees.filter(emp => emp._id === id)[0]
    if (emp)
      return `${emp.name} - ${emp.employeeId}`
  }

  const removeFromTeam = (member: string) => setForm(cur => ({
    ...cur,
    team: cur.team.filter(mem => mem !== member)
  }))

  const handleTL = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(cur => ({
      ...cur,
      teamLeader: (event.target as HTMLInputElement).value
    }))
  }
  const handleTeamMember = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setForm(cur => ({
        ...cur,
        team: [...cur.team, target.value]
      }))
    } else {
      setForm(cur => ({
        ...cur,
        team: cur.team.filter(member => member !== target.value)
      }))
    }
  }

  const editTask = (task: TaskType) => {
    setState(cur => ({
      ...cur,
      editTaskView: true,
      isNewTask: false,
    }))
    setTaskForm(task)
  }

  const closeEditTask = () => {
    setState(cur => ({
      ...cur,
      editTaskView: false
    }))
    setTaskForm({
      createdDate: (new Date()),
      taskDesc: '',
      status: 'NOT_STARTED',
      priority: 'NORMAL',
      projectRef: '',
      __v: 0,
      _id: ''
    })
  }

  const editTaskFormHandler = () => {
    setState(cur => ({ ...cur, isTaskLoading: true }))
    let task: any = {
      priority: taskForm.priority,
      status: taskForm.status,
      taskDesc: taskForm.taskDesc,
      createdDate: state.isNewTask ? new Date() : taskForm.createdDate,
      projectRef: project_id
    }
    if (state.isNewTask === false)
      task = { ...task, id: taskForm._id }
    axiosConfig()
      .post(`/pm/task/${state.isNewTask ? 'add' : 'update'}`, task)
      .then(({ data }) => {
        openAlert({
          type: 'success',
          message: data.message
        })
        fetchTasks()
        setState(cur => ({ ...cur, editTaskView: false }))
        setTaskForm({
          createdDate: (new Date()),
          taskDesc: '',
          status: 'NOT_STARTED',
          priority: 'NORMAL',
          projectRef: '',
          __v: 0,
          _id: ''
        })
      })
      .catch((e) => {
        openAlert({
          type: 'error',
          message: 'Error occurred'
        })
        setState(cur => ({ ...cur, isTaskLoading: false }))
      })
  }

  const taskCardOptions = data.role === 'PM' && state.editTaskView === false ? [{
    label: 'add',
    onClick: () => {
      if (state.editTaskView)
        closeEditTask()
      else
        setState(cur => ({ ...cur, editTaskView: true, isNewTask: true }))
    },
    icon: state.editTaskView ? <CloseIcon /> : <AddIcon />
  }] : []

  const deleteTask = (id: string) => {
    setState(cur => ({ ...cur, isTaskLoading: true }))
    axiosConfig()
      .post('/pm/task/remove', { id })
      .then(({ data }) => {
        openAlert({
          type: 'success',
          message: data.message
        })
        fetchTasks()
      })
      .catch(() => {
        openAlert({
          type: 'success',
          message: 'Error occurred while deleting'
        })
        setState(cur => ({ ...cur, isTaskLoading: false }))
      })
  }

  useEffect(() => {
    fetchTeams()
    fetchTasks()
  }, [])

  useEffect(() => {
    setForm(cur => ({
      ...cur,
      team: cur.team.filter(emp => emp !== form.teamLeader)
    }))
  }, [form.teamLeader])

  if (!navigator.onLine)
    return (
      <div className={css.offline}>
        <OfflineIcon className={css.offlineIcon} />
        <Typography variant="h5" color="textPrimary">
          You are offline now.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Check your internet connection to view more details.
        </Typography>
      </div>
    )

  const details = (
    <div className={css.form}>
      {
        state.teamLeader === 'none' && state.team.length === 0
          ? (
            <div className={css.info} >
              <Typography variant="h6" color="textPrimary">
                No team created yet.
              </Typography>
              <Typography variant="body1" color="textPrimary">
                There is no team to show.<br />{data.role === 'PM' ? 'Create a team now.' : ''}
              </Typography>
              {
                data.role === 'PM' ? (
                  <Button.Primary className={css.createBtn} label="create now" onClick={openEditView} />
                ) : null
              }
            </div>
          ) : (
            <>
              <label>Team Leader</label>
              <TextField className={css.textField} variant="outlined"
                size="small" disabled value={getEmployeeName(state.teamLeader)}
              />
              <label>Team Members</label>
              <div className={css.teamContainer}>
                {
                  state.team.map((member: any) => (
                    <div>
                      <Typography variant="body1" component="p" key={setKey()} color="textPrimary">
                        {getEmployeeName(member.devRef)}
                      </Typography>
                    </div>
                  ))
                }
              </div>
              <label style={{ marginBottom: 10, marginTop: 15 }}>Total team members: {state.team.length}</label>
            </>
          )
      }
    </div >
  )

  return (
    <>
      {
        state.isTeamLoading ? <Loader /> : (
          <Card title="Project Team" options={cardOptions} >
            {
              state.showDeltails ? details : (
                <form className={css.form} onSubmit={e => {
                  e.preventDefault()
                  formSubmitHandler()
                }}>
                  <label>Team Leader</label>
                  <TextField className={css.textField} color="secondary" variant="outlined"
                    size="small" disabled value={getTeamLeader()} />
                  <FormControl variant="outlined" size="small" style={{ flexGrow: 1, marginBottom: 10 }}>
                    <OutlinedInput
                      id="employee-search"
                      placeholder="Search..."
                      startAdornment={
                        <InputAdornment position="start">
                          <FiSearch />
                        </InputAdornment>
                      }
                      onChange={handleSearch}
                    />
                  </FormControl>
                  <label>Select team leader</label>
                  <FormControl component="fieldset" className={css.container} style={{ maxHeight: 270 }}>
                    <RadioGroup aria-label="Developers" name="teamLeader"
                      value={form.teamLeader} onChange={handleTL}>
                      {
                        state.employees.map(emp => (
                          <FormControlLabel key={setKey()} value={emp.id} control={<Radio color="primary" />} label={emp.name} />
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                  <Divider />
                  <div style={{ height: 10 }} />
                  <label>Team members</label>
                  {
                    form.team.length === 0 ? null : (
                      <div>
                        {
                          form.team.map(member => (
                            <Chip label={getEmployeeName(member)} key={setKey()}
                              onDelete={() => removeFromTeam(member)} className={css.chip} />
                          ))
                        }
                      </div>
                    )
                  }
                  <label style={{ marginBottom: 10 }}>Total team members: {form.team.length}</label>
                  <FormControl variant="outlined" size="small" style={{ flexGrow: 1, marginBottom: 10 }}>
                    <OutlinedInput
                      id="dev-search-field"
                      placeholder="Search..."
                      startAdornment={
                        <InputAdornment position="start">
                          <FiSearch />
                        </InputAdornment>
                      }
                      onChange={handleDevSearch}
                    />
                  </FormControl>
                  <label>Choose team members</label>
                  <FormControl component="fieldset" className={css.container}>
                    <FormGroup>
                      {
                        state.developers.filter(emp => emp.id !== form.teamLeader).map(emp => (
                          <FormControlLabel key={setKey()}
                            control={<Checkbox color="primary" value={emp.id} checked={form.team.includes(emp.id)} onChange={handleTeamMember} />}
                            label={emp.name}
                          />
                        ))
                      }
                    </FormGroup>
                  </FormControl>
                  <div className={css.btnContainer}>
                    <Button.Primary label="add" type="submit" />
                    <Button.Secondary label="cancel" onClick={closeEdit} />
                  </div>
                </form>
              )
            }
          </Card>
        )
      } {
        state.isTaskLoading ? <Loader /> : (
          <Card title="Tasks" options={taskCardOptions}>
            <div className={css.taskContainer} >
              {
                state.editTaskView ? (
                  <form className={css.taskForm} onSubmit={e => {
                    e.preventDefault()
                    editTaskFormHandler()
                  }}>
                    <TextField required color="secondary"
                      multiline rows={2} rowsMax={10}
                      variant="outlined"
                      label="Title Descriptions"
                      value={taskForm.taskDesc}
                      onChange={e => setTaskForm(cur => ({ ...cur, taskDesc: e.target.value }))}
                    />
                    <FormControl variant="outlined" size="small">
                      <Typography variant="body2" color="textPrimary">Task Priority</Typography>
                      <Select required
                        value={taskForm.priority}
                        onChange={e => setTaskForm(cur => ({ ...cur, priority: `${e.target.value}` }))}
                      >
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="NORMAL">Normal</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small">
                      <Typography variant="body2" color="textPrimary">Task Status</Typography>
                      <Select required
                        value={taskForm.status}
                        onChange={e => setTaskForm(cur => ({ ...cur, status: `${e.target.value}` }))}
                      >
                        <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="ON_HOLD">On-hold</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                      </Select>
                    </FormControl>
                    <div className={css.btnContainer}>
                      <Button.Primary label={state.isNewTask ? 'add' : 'update'} type="submit" />
                      <Button.Secondary label="cancel" onClick={closeEditTask} />
                    </div>
                  </form>
                ) : state.tasks.map((task: TaskType, index: number) => (
                  <Accordion elevation={0} expanded={expanded === task._id} key={setKey()} onChange={handleChange(task._id)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>Task {index + 1}</Typography>
                      <Typography className={classes.secondaryHeading}>{
                        task.taskDesc.length > 20 ? task.taskDesc.substr(0, 17) + '...' : task.taskDesc
                      }</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={css.task}>
                      <Typography variant="h6" component="h4" color="textPrimary">
                        {task.taskDesc}
                      </Typography>
                      <div className={css.propertiesContainer}>
                        <div className={css.property}>
                          <Typography variant="body2" component="h6" color="textSecondary">
                            Priority:&nbsp;&nbsp;
                            </Typography>
                          <span style={{ backgroundColor: priorityColor[task.priority] }} />
                          <Typography variant="body2" component="p" style={{ textTransform: 'capitalize' }} color="textPrimary">
                            {task.priority.toLowerCase()}
                          </Typography>
                        </div>
                        <div className={css.property}>
                          <Typography variant="body2" component="h6" color="textSecondary">
                            Status:&nbsp;&nbsp;
                            </Typography>
                          <span style={{ backgroundColor: statusColor[task.status] }} />
                          <Typography variant="body2" component="p" color="textPrimary">
                            {status[task.status]}
                          </Typography>
                        </div>
                      </div>
                      <Divider />
                      <div className={css.taskBtnContainer}>
                        <div className={css.property}>
                          <Typography variant="body2" component="h6" color="textSecondary">
                            Start Date:&nbsp;
                            </Typography>
                          <Typography variant="body2" component="p" color="textPrimary">
                            {getDate(task.createdDate)}
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button.Secondary label={
                        <>
                          <span>&nbsp;</span>
                          <DeleteIcon style={{ color: '#EA3C53' }} />
                          <span style={{ color: '#EA3C53' }}>&nbsp;&nbsp;delete&nbsp;</span>
                        </>
                      } onClick={() => deleteTask(task._id)} />
                      <Button.Secondary label={
                        <>
                          <span>&nbsp;</span>
                          <EditIcon />
                          <span>&nbsp;&nbsp;edit&nbsp;</span>
                        </>
                      } onClick={() => editTask(task)} />
                    </AccordionActions>
                  </Accordion>
                ))
              } {
                state.tasks.length === 0 && (
                  <div className={css.info} >
                    <Typography variant="h6" color="textPrimary">No task added yet.</Typography>
                    <Typography variant="body1" color="textPrimary">
                      There are no task for this project to show.<br />{data.role === 'PM' ? 'Add a task now.' : ''}
                    </Typography>
                    {
                      data.role === 'PM' ? (
                        <Button.Primary className={css.createBtn} label="add now" />
                      ) : null
                    }
                  </div>
                )
              }
            </div>
          </Card>
        )
      }
    </>
  )
}

export default ProjectTeam

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
  },
}))

const useCSS = makeStyles(({ spacing, palette, shape }) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      fontSize: spacing(1.85),
      color: palette.secondary.main,
      fontWeight: 600
    }
  },
  textField: {
    '& input': {
      color: palette.secondary.main
    },
    marginBottom: spacing(1.25)
  },
  container: {
    maxHeight: spacing(50),
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius,
    marginBottom: spacing(2),
    padding: spacing(1)
  },
  chip: {
    backgroundColor: palette.common.white,
    margin: spacing(1)
  },
  loader: {
    margin: spacing(5),
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    '& > *': {
      marginLeft: spacing(2)
    }
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing(1.5)
  },
  createBtn: {
    borderRadius: spacing(999)
  },
  teamContainer: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(37)}px, 1fr))`,
    '& > div': {
      backgroundColor: palette.background.default,
      margin: spacing(0.25),
      padding: spacing(0.75),
      borderRadius: shape.borderRadius,
      '& p': {
        paddingLeft: spacing(1),
        fontSize: spacing(2.15)
      }
    }
  },
  offline: {
    margin: spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing(1.5),
  },
  offlineIcon: {
    fontSize: spacing(15),
    color: '#888'
  },
  taskContainer: {
    display: 'grid',
    'grid-template-columns': '1fr'
  },
  task: {
    display: 'block',
    padding: spacing(1.5),
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius,
    margin: spacing(0.75),
    '& > *': {
      marginBottom: spacing(1.5),
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  propertiesContainer: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(15)}px, 1fr))`
  },
  property: {
    '& span': {
      width: spacing(2),
      height: spacing(2),
      display: 'inline-block',
      borderRadius: 999
    },
    display: 'flex',
    alignItems: 'center',
    '& p': {
      display: 'inline-block',
      marginLeft: spacing(0.75)
    }
  },
  taskBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewBtn: {
    '& svg': {
      fontSize: spacing(3)
    }
  },
  taskForm: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: spacing(1.5),
      '&:last-child': {
        marginBottom: 0
      }
    }
  }
}))
