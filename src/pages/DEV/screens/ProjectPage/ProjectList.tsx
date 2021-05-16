import {
  Accordion,
  AccordionSummary,
  AccordionDetails, MenuItem,
  makeStyles, Typography, FormControl, Select,
  OutlinedInput, InputAdornment, AccordionActions
} from '@material-ui/core'
import { useContext, useState } from 'react'
import {
  FiChevronDown as ExpandIcon,
  FiSearch,
} from 'react-icons/fi'
import Moment from 'react-moment'
import Card from '../../../../components/Card'
import { DataContext } from '../../DataContext'
import { useHistory } from 'react-router-dom'
import Button from '../../../../components/Button'


const ProjectAccordion = () => {

  const { data } = useContext(DataContext)

  const history = useHistory()

  const records: any = (data.role === 'PM')
    ? data.projects.PM
    : (
      data.role === 'TL'
        ? data.projects.TL.map(project => project.projectRef)
        : data.projects.TL.map(project => project.projectRef)
    )

  const image = (id: string) => eval(id[id.length - 1].charCodeAt(0).toString().split('').join('+')) % 16

  let projectList: any = []

  if (records.length !== 0)
    projectList = records.map((project: any) => ({
      projectDesc: project.projectDesc,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      _id: project._id,
      startDate: project.startDate,
      endDate: project.endDate
    }))

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

  const projects: any[] = filterFN.fn(projectList)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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
                  <Typography variant="body1" component="span" color="textSecondary">
                    {project.projectId}
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    {project.projectTitle}
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
                  <Typography variant="body1" className="justify-text" color="textPrimary">
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
                </Card>
              </AccordionDetails>
              <AccordionActions>
                <Button.Secondary
                  label="View More"
                  onClick={() => history.push(`projects/${project._id}-${image(project.projectId)}`)}
                />
              </AccordionActions>
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
    '& > span': {
      width: spacing(9)
    }
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
  }
}))