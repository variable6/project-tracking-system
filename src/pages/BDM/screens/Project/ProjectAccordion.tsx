import {
  Accordion,
  AccordionSummary,
  AccordionDetails, MenuItem,
  makeStyles, Typography, FormControl, Select,
  OutlinedInput, InputAdornment,
  Button, fade
} from '@material-ui/core'
import { useState } from 'react'
import {
  FiChevronDown as ExpandIcon,
  FiSearch,
  FiEdit3 as EditIcon,
  FiTrash2 as DeleteIcon
} from 'react-icons/fi'
import Moment from 'react-moment'
import Card from '../../../../components/Card'

import {
  ProjectType2
} from '../../../../types'

const ProjectAccordion = (props: {
  projects: ProjectType2[],
  setDelete: (id: string, title: string) => void,
  openEditForm: () => void
}) => {

  const css = useCSS()
  
  const [expanded, setExpanded] = useState<string | false>(false);

  const [filterFN, setFilterFN] = useState({
    fn: (item: any) => item
  })

  const [searchBy, setSearchBy] = useState('projectTitle')
  // ======================= initializing filterFunc
  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFN({
      fn: item => {
        if (target.value === '')
          return item
        else
          return item.filter((x: any) => x[searchBy].toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }

  const projects: ProjectType2[] = filterFN.fn(props.projects)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };


  const editHandler = () => {
    props.openEditForm()
  }

  const getDate = (date: Date) => (
    <Moment format="MMM DD, YYYY">{date}</Moment>
  )


  return (
    <>
      <div className={css.tooltip} >
        <FormControl variant="outlined" size="small">
          <Select
            labelId="employee-search-label"
            id="employee-search"
            className={css.searchBy}
            value={searchBy}
            onChange={({ target }) => setSearchBy(`${target.value}`)}
          >
            <MenuItem value="projectTitle">Search by Title</MenuItem>
            <MenuItem value="projectId">Search by ID</MenuItem>
            <MenuItem value="managerName">Search by Manager</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" style={{ flexGrow: 1 }}>
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
      </div>
      <div>
        {
          projects.map(project => (
            <Accordion key={project._id} className={css.accordion}
              expanded={expanded === project._id} onChange={handleChange(project._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandIcon />}
              >
                <div className={expanded === project._id ? css.summaryHidden : css.summary}>
                  <Typography variant="h6" color="secondary">
                    {project.projectTitle}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {project.projectId}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={css.details}>
                <Card title="Project" marginTop="0" noshadow={true}>
                  <section className={css.section}>
                    <div>
                      <Typography variant="body2" component="p" color="textSecondary">
                        Project ID
                    </Typography>
                      <Typography variant="h6" color="textPrimary">
                        {project.projectId}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" component="p" color="textSecondary">
                        Project Title
                    </Typography>
                      <Typography variant="h6" color="textPrimary">
                        {project.projectTitle}
                      </Typography>
                    </div>
                  </section>
                </Card>
                <Card title="Description" marginTop="0" noshadow={true}>
                  <Typography variant="body1"
                    style={{ whiteSpace: 'pre-line' }} color="textPrimary">
                    {project.projectDesc}
                  </Typography>
                </Card>
                <Card title="Details" marginTop="0" noshadow={true}>
                  <section className={css.section}>
                    <div>
                      <Typography variant="body2" component="p" color="textSecondary">
                        Start Date
                    </Typography>
                      <Typography variant="h6" color="textPrimary">
                        {project.startDate ? getDate(project.startDate) : '-N/A-'}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" component="p" color="textSecondary">
                        End Date
                      </Typography>
                      <Typography variant="h6" color="textPrimary">
                        {project.endDate ? getDate(project.endDate) : '-N/A-'}
                      </Typography>
                    </div>
                  </section>
                  <section className={css.section} style={{ marginTop: 15 }}>
                    <div>
                      <Typography variant="body2" component="p" color="textSecondary">
                        Project Manager
                      </Typography>
                      <Typography variant="h6" color="textPrimary">
                        {project.managerName}
                      </Typography>
                    </div>
                    <div className={css.btnCtn}>
                      <Button className={css.btnDelete}
                        onClick={() => props.setDelete(project.projectId, project.projectTitle)}>
                        &nbsp;<DeleteIcon /> &nbsp; delete&nbsp;
                      </Button>
                      <Button className={css.btnEdit} onClick={editHandler}>
                        &nbsp;&nbsp;<EditIcon /> &nbsp; edit &nbsp;
                      </Button>
                    </div>
                  </section>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </>
  );
}

export default ProjectAccordion;

const useCSS = makeStyles(({ palette, shape, spacing, breakpoints }) => ({
  accordion: {
    backgroundColor: palette.background.default,
    boxShadow: 'none',
  },
  details: {
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius,
    margin: spacing(1.8),
    marginTop: 0,
    padding: spacing(0),
    display: 'flex',
    gap: spacing(0),
    flexDirection: 'column'
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
  },
  summaryHidden: {
    display: 'none'
  },
  section: {
    display: 'flex',
    '& > div': {
      flexGrow: 1,
      '&:last-child': {
        flexGrow: 2
      }
    },
    [breakpoints.down(512)]: {
      flexDirection: 'column',
      gap: spacing(2)
    }
  },
  tooltip: {
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.only('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    [breakpoints.up('lg')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    marginBottom: spacing(2)
  },
  searchBy: {
    marginBottom: 10,
    [breakpoints.only('sm')]: {
      marginBottom: 0,
      marginRight: spacing(1.5)
    },
    [breakpoints.up('lg')]: {
      marginBottom: 0,
      marginRight: spacing(1.5)
    }
  },
  btnCtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: spacing(1),
    gap: spacing(1.5)
  },
  btnEdit: {
    color: palette.secondary.main,
    fontWeight: 600,
    backgroundColor: palette.common.white,
    '&:hover': {
      backgroundColor: palette.common.white
    }
  },
  btnDelete: {
    color: palette.error.main,
    fontWeight: 600,
    backgroundColor: fade(palette.text.disabled, 0.05),
    '&:hover': {
      backgroundColor: fade(palette.text.disabled, 0.1)
    }
  }
}))