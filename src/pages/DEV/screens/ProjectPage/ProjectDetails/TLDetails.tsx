import {
  makeStyles,
  Typography,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider
} from '@material-ui/core'
import {
  FiWifiOff as OfflineIcon,
  FiChevronDown as ExpandMoreIcon
} from 'react-icons/fi'
import { useEffect, useState, ChangeEvent } from "react";
import { v4 as setKey } from 'uuid'

import Card from "../../../../../components/Card";
import Button from "../../../../../components/Button";
import axiosConfig from "../../../../../config/axiosConfig";

import { status, statusColor, priorityColor, useStyles, getDate, TaskType, Loader } from './TeamAndTask'


const TLDetails = ({ project_id }: { project_id: string }) => {

  const css = useCSS()
  const classes = useStyles()

  const [state, setState] = useState({
    team: [],
    tasks: [],
    showEditTaskForm: false,
    showAssignTaskForm: false,
    isTeamLoading: true,
    isTaskLoading: true
  })

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setTaskLoader = () => setState(cur => ({ ...cur, isTaskLoading: true }))
  const setTeamLoader = () => setState(cur => ({ ...cur, isTeamLoading: true }))
  const removeTeamLoader = () => setState(cur => ({ ...cur, isTeamLoading: false }))
  const removeTaskLoader = () => setState(cur => ({ ...cur, isTaskLoading: false }))

  const fetchTeam = () => {
    setTeamLoader()
    axiosConfig()
      .get(`/tl/project/team/${project_id}`)
      .then(({ data }) => {
        console.log(data)
        removeTeamLoader()
      })
      .catch(e => {
        console.log(e)
        removeTeamLoader()
      })
  }
  const fetchTasks = () => {
    setTaskLoader()
    axiosConfig()
      .get(`/tl/project/tasks/${project_id}`)
      .then(({ data }) => {
        setState(cur => ({
          ...cur,
          tasks: data
        }))
        removeTaskLoader()
      })
      .catch(e => {
        console.log(e)
        removeTaskLoader()
      })
  }

  useEffect(() => {
    fetchTeam()
    fetchTasks()
  }, [])

  const Team = state.isTeamLoading ? <Loader /> : (
    <Card title="Team">

    </Card>
  )

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
  return (
    <>
      {Team}
      {
        state.isTaskLoading ? <Loader /> : (
          <Card title="Tasks" >
            <div className={css.taskContainer}>
              {state.showAssignTaskForm && <></>}
              {
                state.showEditTaskForm ? <></> : (
                  state.tasks.map((task: TaskType, index: number) => (
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
                              Created on&nbsp;
                            </Typography>
                            <Typography variant="body2" component="p" color="textPrimary">
                              {getDate(task.createdDate)}
                            </Typography>
                          </div>
                        </div>
                      </AccordionDetails>
                      <AccordionActions>
                        <Button.Secondary label="edit" onClick={() => null} />
                        <Button.Primary label="Assign task" onClick={() => null} />
                      </AccordionActions>
                    </Accordion>
                  ))
                )
              }
            </div>
          </Card>
        )
      }
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
    'grid-template-columns': `repeat(auto-fit, minmax(${spacing(18.5)}px, 1fr))`,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))