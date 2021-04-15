import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles, Typography
} from '@material-ui/core'
import { useState } from 'react'
import {
  FiChevronDown as ExpandIcon
} from 'react-icons/fi'

import {
  ProjectType
} from '../../../../types'

const ProjectAccordion = (props: { projects: ProjectType[] }) => {

  const { projects } = props
  const css = useCSS()

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div>

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
                  <Typography variant="h5" color="secondary">
                    {project.projectTitle}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {project.projectId}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={css.details}>
                {project.projectDesc}
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </>
  );
}

export default ProjectAccordion;

const useCSS = makeStyles(({ palette, shape, spacing }) => ({
  accordion: {
    backgroundColor: palette.background.default,
    boxShadow: 'none',
  },
  details: {
    backgroundColor: palette.common.white,
    borderRadius: shape.borderRadius,
    margin: spacing(1.8),
    marginTop: 0,
    padding: spacing(1.25)
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
  },
  summaryHidden: {
    display: 'none'
  }
}))