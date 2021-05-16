import {
  makeStyles,
  Typography,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Drawer
} from '@material-ui/core'
import {
  FiWifiOff as OfflineIcon,
  FiChevronDown as ExpandMoreIcon,
} from 'react-icons/fi'
import { useEffect, useState, ChangeEvent, useContext } from "react";
import { v4 as setKey } from 'uuid'

import Card from "../../../../../components/Card";
import Button from "../../../../../components/Button";
import axiosConfig from "../../../../../config/axiosConfig";

import { useCSS as useClasses } from './TeamAndTask'

import { status, statusColor, priorityColor, useStyles, getDate, TaskType, Loader } from './TeamAndTask'
import useFetch from '../../../useFetch';
import { AlertContext } from '../../../../../context/AlertContext';


const initForm = {
  taskRef: '',
  devRef: 'none',
  status: '',
}

const initPopUp = {
  isOpen: false,
  isUnAssignForm: false,
  isAssignForm: false,
  isStatusForm: false,
}


const TLDetails = ({ project_id, projectTeam }: { project_id: string, projectTeam: any[] }) => {

  const css = useCSS()
  const classes = useStyles()
  const styles = useClasses()

  console.log(projectTeam)

  const { openAlert } = useContext(AlertContext)
  const { fetchProjectTL } = useFetch()

  const [state, setState] = useState({
    tasks: [],
    isTaskLoading: true,
    assignEmp: [],
    unAssignEmp: []
  })

  const [form, setForm] = useState(initForm)

  const [popUp, setPopUp] = useState(initPopUp)

  const closePopUp = () => {
    setPopUp(initPopUp)
    setForm(initForm)
  }


  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setTaskLoader = () => setState(cur => ({ ...cur, isTaskLoading: true }))
  const removeTaskLoader = () => setState(cur => ({ ...cur, isTaskLoading: false }))

  const fetchUnAssignEmp = () => {

    axiosConfig()
      .get(`/tl/project/team/unassigned/${project_id}`)
      .then(({ data }) => {
        setState(cur => ({ ...cur, unAssignEmp: data }))
        removeTaskLoader()
      })
      .catch((e) => {
        console.log(e, 'un')
        removeTaskLoader()
      })
  }

  const fetchAssignEmp = () => {
    axiosConfig()
      .get(`/tl/project/team/assigned/${project_id}`)
      .then(({ data }) => {
        console.log(data)
        setState(cur => ({ ...cur, assignEmp: data }))
        fetchUnAssignEmp()
      })
      .catch((e) => {
        console.log(e, 'as')
        fetchUnAssignEmp()
      })
  }

  const fetchTask = () => {

    setTaskLoader()
    axiosConfig()
      .get(`/tl/project/tasks/${project_id}`)
      .then(({ data }) => {
        console.log(data)
        setState(cur => ({ ...cur, tasks: data }))
        removeTaskLoader()
      })
      .catch(e => {
        console.log(e)
        removeTaskLoader()
      })
  }

  const fetchAll = () => {
    fetchTask()
    fetchAssignEmp()
    fetchUnAssignEmp()
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const isAssigned = (id: string) => state.assignEmp.filter((item: any) => item.taskRef === id).length !== 0

  const getAssignedEmpName = (id: string) => {
    const emp: any = state.assignEmp.filter((item: any) => item.taskRef === id).map((item: any) => item.devRef)[0]
    return `${emp.employeeId} - ${emp.name}`
  }

  const getAssignedID = (id: string) => {
    const emp: any = state.assignEmp.filter((item: any) => item.taskRef === id).map((item: any) => item.devRef)[0]
    return emp._id
  }



  const statusChange = () => {

    setTaskLoader()
    closePopUp()

    axiosConfig()
      .post('/tl/project/task/update', {
        id: form.taskRef,
        status: form.status
      })
      .then(() => {
        openAlert({
          type: 'message',
          message: 'Task status updated'
        })
        fetchTask()
      })
      .catch(() => {
        openAlert({
          type: 'error',
          message: 'Error while updating status'
        })
        removeTaskLoader()
      })
  }

  const assignTask = () => {

    setTaskLoader()
    closePopUp()

    axiosConfig()
      .post('/tl/project/team/assignTask', {
        taskRef: form.taskRef,
        devRef: form.devRef
      })
      .then(() => {
        openAlert({
          type: 'message',
          message: 'Task is assigned'
        })
        fetchAssignEmp()
        fetchProjectTL()
        fetchTask()
      })
      .catch(() => {
        openAlert({
          type: 'error',
          message: 'Error while assigning task'
        })
        removeTaskLoader()
      })
  }

  const unAssignEmp = () => {

    setTaskLoader()
    closePopUp()

    axiosConfig()
      .post('/tl/project/team/unassignTask', {
        taskRef: form.taskRef,
        devRef: form.devRef
      })
      .then(() => {
        openAlert({
          type: 'message',
          message: 'Task is unassigned'
        })
        fetchAssignEmp()
        fetchProjectTL()
        fetchTask()
      })
      .catch(() => {
        openAlert({
          type: 'error',
          message: 'Error while unassigning task'
        })
        removeTaskLoader()
      })
  }

  const openUnAssignForm = (taskRef: string, devRef: string) => {
    setPopUp(cur => ({
      ...cur,
      isOpen: true,
      isUnAssignForm: true
    }))
    setForm(cur => ({
      ...cur,
      taskRef: taskRef,
      devRef: devRef
    }))
  }

  const openAssignForm = (taskRef: string) => {
    setPopUp(cur => ({
      ...cur,
      isOpen: true,
      isAssignForm: true
    }))
    setForm(cur => ({
      ...cur,
      taskRef: taskRef,
      devRef: 'none'
    }))
  }

  const openStatusForm = (taskRef: string, status: string) => {
    setPopUp(cur => ({
      ...cur,
      isOpen: true,
      isStatusForm: true
    }))
    setForm(cur => ({
      ...cur,
      taskRef: taskRef,
      status: status
    }))
  }

  const Team = (
    <Card title="Team">
      <div className={styles.form}>
        {
          projectTeam.length === 0
            ? (
              <div className={styles.info} >
                <Typography variant="h6" color="textPrimary">
                  No team created yet.
              </Typography>
                <Typography variant="body1" color="textPrimary">
                  There is no team to show.
                </Typography>
              </div>
            ) : (
              <>
                <div className={styles.teamContainer}>
                  {
                    projectTeam.map((member: any) => (
                      <div className={css.t1}>
                        <div style={{ backgroundColor: member.isAssigned ? '#29ab87' : '#EA3C53' }} />
                        <Typography variant="body1" component="p" key={setKey()} color="textPrimary">
                          {member.devRef.employeeId} - {member.devRef.name}
                        </Typography>
                      </div>
                    ))
                  }
                </div>
                <label style={{ marginBottom: 10, marginTop: 15 }}>Total team members: {projectTeam.length}</label>
              </>
            )
        }
      </div >
    </Card>
  )

  if (!navigator.onLine)
    return (
      <>
        {Team}
        <div className={css.offline}>
          <OfflineIcon className={css.offlineIcon} />
          <Typography variant="h5" color="textPrimary">
            You are offline now.
        </Typography>
          <Typography variant="body1" color="textSecondary">
            Check your internet connection to view more details.
        </Typography>
        </div>
      </>
    )


  return (
    <>
      {Team}
      {
        state.isTaskLoading ? <Loader /> : (
          <Card title="Tasks" >
            <div className={css.taskContainer}>
              {state.tasks.length === 0 && (
                <div className={styles.info} >
                  <Typography variant="h6" color="textPrimary">No task added yet.</Typography>
                  <Typography variant="body1" color="textPrimary">
                    There are no task for this project to show.
                </Typography>
                </div>
              )}{
                  state.tasks.map((task: TaskType, index: number) => (
                    <Accordion elevation={0} expanded={expanded === task._id} key={setKey()} onChange={handleChange(task._id)}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          <div className={css.t1}>
                            <div style={{ backgroundColor: isAssigned(task._id) ? '#29ab87' : '#EA3C53' }} />
                            <span>&nbsp;&nbsp;Task #{index + 1}</span>
                          </div>
                        </Typography>
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
                          <div className={css.property}>
                            <Typography variant="body2" component="h6" color="textSecondary">Task Credit:&nbsp;</Typography>
                            <Typography variant="body2" component="p" color="textPrimary">{task.credits}</Typography>
                          </div>
                        </div>
                        <Divider />
                        <div className={css.taskBtnContainer}>
                          <div className={css.property}>
                            <Typography variant="body2" component="h6" color="textSecondary">
                              Created on&nbsp;
                            </Typography>
                            <Typography variant="body2" component="p" color="textPrimary">
                              {getDate(task.createdDate)}
                            </Typography>
                          </div>
                          {
                            task.status === 'COMPLETED' && (
                              <div className={css.property}>
                                <Typography variant="body2" component="h6" color="textSecondary">
                                  Completed on&nbsp;
                                </Typography>
                                <Typography variant="body2" component="p" color="textPrimary">
                                  {task.doc ? getDate(task.doc) : ''}
                                </Typography>
                              </div>
                            )
                          }
                        </div>
                      </AccordionDetails>
                      <AccordionActions>
                        <div style={{ flex: 1 }}>
                          {
                            isAssigned(task._id) ? (
                              <div className={css.property}>
                                <Typography variant="body2" component="h6" color="textSecondary">
                                  Assigned to&nbsp;
                                </Typography>
                                <Typography variant="body2" component="p" color="textPrimary">
                                  {getAssignedEmpName(task._id)}
                                </Typography>
                              </div>
                            ) : (
                              <div className={css.property}>
                                <Typography variant="body2" component="h6" color="textSecondary">
                                  Not Assigned
                                </Typography>
                              </div>
                            )
                          }
                        </div>
                        {
                          isAssigned(task._id) ? (
                            <Button.Secondary
                              label="Un Assign"
                              onClick={() => openUnAssignForm(task._id, getAssignedID(task._id))}
                            />
                          ) : (
                            <Button.Secondary
                              label="Assign"
                              onClick={() => openAssignForm(task._id)}
                            />
                          )
                        }
                        <Button.Secondary
                          label="update Status"
                          onClick={() => openStatusForm(task._id, task.status)}
                        />
                      </AccordionActions>
                    </Accordion>
                  )
                )
              }
            </div>
          </Card>
        )
      }
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={popUp.isOpen}
        onClose={closePopUp}
      >
        {popUp.isUnAssignForm && (
          <div className={css.popupContainer}>
            <Typography variant="h4" color="textPrimary">Are you sure?</Typography>
            <Typography variant="body1" color="textPrimary">
              Please, confirm to unassign the task.
            </Typography>
            <Divider />
            <div className={css.btnContainer}>
              <Button.Secondary label="Confirm" onClick={unAssignEmp} />
              <Button.Primary label="Cancel" onClick={closePopUp} />
            </div>
          </div>
        )} {
          popUp.isAssignForm && (
            <form
              className={css.popupContainer}
              onSubmit={e => {
                e.preventDefault()
                assignTask()
              }}
            >
              <Typography variant="h4" color="textPrimary">Assign Task</Typography>
              <FormControl variant="outlined" size="small">
                <Select value={form.devRef} onChange={e => setForm(c => ({ ...c, devRef: `${e.target.value}` }))} >
                  <MenuItem value="none">Select a Developer</MenuItem>
                  {
                    state.unAssignEmp.map((dev: any) => (
                      <MenuItem value={dev.devRef._id}>{dev.devRef.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Divider />
              <div className={css.btnContainer}>
                <Button.Secondary label="cancel" onClick={closePopUp} />
                <Button.Primary label="update" type="submit" />
              </div>
            </form>
          )
        } {
          popUp.isStatusForm && (
            <form
              className={css.popupContainer}
              onSubmit={e => {
                e.preventDefault()
                statusChange()
              }}
            >
              <Typography variant="h4" color="textPrimary">
                Update Task Status
                </Typography>
              <FormControl variant="outlined" size="small">
                <Select value={form.status} onChange={e => setForm(c => ({ ...c, status: `${e.target.value}` }))} >
                  <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="ON_HOLD">On-hold</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </FormControl>
              <Divider />
              <div className={css.btnContainer}>
                <Button.Secondary label="cancel" onClick={closePopUp} />
                <Button.Primary label="update" type="submit" />
              </div>
            </form>
          )
        }
      </Drawer>
    </>
  )
}

export default TLDetails

const useCSS = makeStyles(({ spacing, palette, shape }) => ({
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
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(20)}px, 1fr))`,
    gridGap: spacing(1.5)
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
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(19)}px, 1fr))`,
    gridGap: spacing(1.5)
  },
  t1: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      width: 6, height: 15, borderRadius: 15
    }
  },
  formContainer: {
    display: 'grid',
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(37)}px, 1fr))`,
    gridGap: spacing(2)
  },
  popupContainer: {
    width: '100vw',
    maxWidth: spacing(65),
    padding: spacing(3),
    paddingBottom: spacing(4.5),
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: spacing(2)
    }
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: spacing(2.15)
    }
  }
}))

// devRef taskRef assign

// taskRef
