import {
  makeStyles, Typography,
  Accordion, AccordionDetails,
  AccordionSummary, Divider
} from "@material-ui/core";
import { useEffect, useState, ChangeEvent } from "react";
import { v4 as setKey } from 'uuid'
import {
  FiChevronDown as ExpandMoreIcon,
} from 'react-icons/fi'

import BreadCrumbs from "../../../components/Breadcrumbs";
import axiosConfig from "../../../config/axiosConfig";
import storage from "../../../config/localStorageConfig";
import PageContainer from "../layouts/PageContainer";
import { useCSS as useClasses } from './ProjectPage/ProjectDetails/TLDetails'
import { useStyles, statusColor, status, priorityColor, getDate } from './ProjectPage/ProjectDetails/TeamAndTask'
import Card from './../../../components/Card'

interface TaskType {
  createdDate: Date
  credits: String
  doc: null | Date
  last_update: String
  priority: "NORMAL" | 'LOW' | 'HIGH'
  projectRef: {
    endDate: null | Date,
    isCompleted: boolean,
    projectId: string,
    projectTitle: string,
    last_update: Date,
    managerId: string,
    projectDesc: string,
    startDate: Date,
    _id: string
  }
  status: "ACTIVE" | 'NOT_STARTED' | 'ON_HOLD' | 'COMPLETED'
  taskDesc: "1"
  __v: 0
  _id: "609e84cead1f190015b31adb"
}

const storageName = 'Tasks-assigned'


const TaskScreen = () => {

  const css1 = useCSS()
  const css = useClasses()
  const classes = useStyles()

  const [state, setState] = useState<{ tasks: TaskType[] }>({
    tasks: []
  })

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axiosConfig()
      .get('/dev/tasks')
      .then(({ data }) => {
        console.log(data)
        setState({ tasks: data.map((item: any) => item.taskRef) })
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <PageContainer>
      <div className={css1.root}>
        <Typography variant="h5" color="textPrimary">Tasks</Typography>
        <div style={{ height: 16 }} />
        <BreadCrumbs currentPage="Tasks" links={[{ label: 'Dashboard', path: '/' }]} />
        <Card title="Tasks" >
          <div className={css.taskContainer}>
            {state.tasks.length === 0 && (
              <div className={css1.info} >
                <Typography variant="h6" color="textPrimary">No task assigned yet.</Typography>
                <Typography variant="body1" color="textPrimary">
                  There are no task assigned for you to show.
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
                </Accordion>
              )
              )
            }
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default TaskScreen;

const useCSS = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(2.5),
    width: '100%',
    height: '100%'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing(1.5)
  }
}))