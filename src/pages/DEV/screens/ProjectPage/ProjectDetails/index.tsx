import { useContext, useState, UIEvent } from 'react'
import { FiChevronLeft as BackIcon } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../../DataContext'
import { makeStyles, Typography, fade, IconButton, AppBar, Toolbar, useTheme } from "@material-ui/core";
import images from "../../../../../assets/images";

import { ProjectPMType } from '../../../../../types'
import PageContainer from '../../../layouts/PageContainer';
import shadow from '../../../../../constants/backgroundShadow';
import drawerWidth from '../../../../../constants/sibebarWidth';

const IMAGE_HEIGHT = 270

interface MatchParams {
  isExact: boolean
  params: any
  path: string
  url: string
}
const setBackground = (index: number) => ({
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.95) 100%), url("${images[index]}")`
})

const Index = ({ match }: { match: MatchParams }) => {

  const { projectId, imgIndex } = match.params

  const { data } = useContext(DataContext)

  const [showAppbar, setShowAppbar] = useState(false)

  const history = useHistory()

  const currentProject = data.projects.PM.filter((project: ProjectPMType) => project._id === projectId)[0]

  const onScroll = (event: UIEvent<HTMLElement>) => {
    if (event.currentTarget.scrollTop > (IMAGE_HEIGHT - 65))
      setShowAppbar(true)
    else
      setShowAppbar(false)
  }

  const backButtonHandler = () => history.goBack()

  const css = useCSS()

  return (
    <PageContainer>
      <AppBar position="fixed" color="inherit" className={`${css.appBar} ${showAppbar ? css.openAppBar : ''}`}>
        <Toolbar>
          <IconButton edge="start" onClick={backButtonHandler} >
            <BackIcon />
          </IconButton>
          <Typography variant="h4" component="h2">
            {currentProject.projectTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={css.scrollContainer} onScroll={onScroll}>
        <div className={css.backgroundImage} style={setBackground(imgIndex)}>
          <div>
            <IconButton edge="start" onClick={backButtonHandler} >
              <BackIcon />
            </IconButton>
            <Typography variant="h4" component="h2">
              {currentProject.projectTitle}
            </Typography>
          </div>
        </div>
        <main className={css.container}>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            qwerty
      </Typography>
          <Typography variant="h5" color="textPrimary">
            last
      </Typography>
        </main>
      </div>
    </PageContainer>
  );
}

export default Index

const useCSS = makeStyles(({ spacing, palette, mixins, breakpoints }) => ({
  backgroundImage: {
    padding: `${spacing(1.7)}px ${spacing(3)}px`,
    height: IMAGE_HEIGHT,
    width: '100%',
    backgroundSize: 'cover',
    'background-position': 'center',
    display: 'flex',
    flexDirection: 'column-reverse',
    '& h2': {
      color: fade(palette.background.paper, 0.9),
      fontWeight: 500,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      [breakpoints.down(spacing(55))]: {
        fontSize: spacing(3)
      }
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      '& .MuiIconButton-root': {
        color: fade(palette.background.paper, 0.9),
        marginRight: spacing(1.5),
        '&:hover': {
          backgroundColor: fade(palette.background.paper, 0.15)
        }
      }
    },
    [breakpoints.down('xs')]: {
      padding: `${spacing(1.7)}px ${spacing(2.5)}px`
    }
  },
  container: {
    padding: `${spacing(2.5)}px ${spacing(3)}px`,
    [breakpoints.down('xs')]: {
      padding: spacing(2.5)
    }
  },
  scrollContainer: {
    height: '100%',
    maxHeight: `calc(100vh - ${mixins.toolbar.minHeight}px)`,
    overflow: 'auto',
    [breakpoints.up('md')]: {
      maxHeight: '100vh'
    }
  },
  appBar: {
    'clip-path': 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transition: 'clip-path 750ms',
    [breakpoints.up('md')]: {
      left: drawerWidth
    },
    '& h2': {
      color: palette.text.primary,
      fontWeight: 500,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      fontSize: spacing(3.15)
    },
    '& .MuiIconButton-root': {
      marginRight: spacing(1.5)
    }
  },
  openAppBar: {
    'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    borderBottom: `1.5px solid ${fade(palette.text.hint, 0.25)}`
  }
}))