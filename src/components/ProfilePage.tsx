import {
  makeStyles,
  Drawer, Typography, IconButton,
  Avatar, AppBar, Tab, withStyles, Button
} from '@material-ui/core'
import {
  useState,
  ChangeEvent,
  useContext,
  useEffect
} from 'react'
import { useHistory } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
  FiChevronRight as CloseIcon,
  FiUser as UserIcon
} from 'react-icons/fi'
import Card from './Card'
import { ProfileContext } from '../context/ProfilePageContext'
import { AuthContext } from '../context/AuthContext'
import desigantion from '../constants/designation'

const Profile = withStyles(({ breakpoints, spacing }) => ({
  root: {
    [breakpoints.up('sm')]: {
      backdropFilter: `blur(${spacing(0.5)}px)`,
    }
  }
}))(Drawer)

interface StateTypes {
  options: '' | 'PWD' | 'EDIT'
}

const ProfilePage = () => {

  const { isProfileOpen, closeProfile } = useContext(ProfileContext)
  const { user } = useContext(AuthContext)

  const css = useCSS()

  const history = useHistory()

  useEffect(() => {
    const current = history.location.pathname
    window.onpopstate = () => {
      if (isProfileOpen) {
        closeProfile()
        history.replace(current)
      }
    }
  }, [isProfileOpen])

  const [value, setValue] = useState('1');
  const [state, setState] = useState<StateTypes>({
    options: ''
  })

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const options = (
    <Card title="Options">
      <div style={{ display: 'flex', gap: 20 }}>
        <Button style={{ fontWeight: 600 }} onClick={() => null} >
          change password
        </Button>
        <Button style={{ fontWeight: 600 }} onClick={() => null}>
          edit
        </Button>
      </div>

    </Card>
  )

  const tabOne = (
    <Card title="Profile">
      <div className={css.detailsContainer}>
        <div>
          <Typography variant="body2" color="textSecondary">
            Name
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.name}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Employee ID
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.employeeId}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Designation
          </Typography>
          <Typography variant="h6" color="secondary">
            {desigantion[user.designation]}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            Email
          </Typography>
          <Typography variant="h6" color="secondary">
            {user.email}
          </Typography>
        </div>
      </div>
    </Card>
  )

  return (
    <Profile
      variant="temporary"
      anchor="right"
      open={isProfileOpen}
      onClose={closeProfile}

    >
      <div className={css.root} >
        <span className={css.bg} />
        <div className={css.container}>
          <IconButton edge="start" aria-label="close-profile" onClick={closeProfile}>
            <CloseIcon />
          </IconButton>
          <div className={css.profileCont}>
            <div>
              <Typography variant="h6" component="h4" color="secondary">
                {user.name}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {user.employeeId}
              </Typography>
            </div>
            <Avatar className={css.profilAvatar}>
              <UserIcon />
            </Avatar>
          </div>
          <TabContext
            value={value}
          >
            <AppBar position="static" color="transparent" className={css.appBar}>
              <TabList onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Personal" value="1" />
                <Tab label="" disabled className={css.fix} />
                <Tab label="Person" value="2" />
              </TabList>
            </AppBar>
            <TabPanel value="1" style={{ padding: 0 }}>
              {tabOne}
              {options}
            </TabPanel>
            <TabPanel value="2">qwertwy</TabPanel>
          </TabContext>
        </div>
      </div>
    </Profile>
  );
}

export default ProfilePage;

const useCSS = makeStyles(({ breakpoints, palette, spacing }) => ({
  root: {
    width: '100vw',
    [breakpoints.up('sm')]: {
      width: 510
    }
  },
  bg: {
    position: 'absolute',
    display: 'grid',
    width: '100%',
    height: spacing(40),
    backgroundColor: palette.common.white,
    zIndex: -1,
  },
  container: {
    padding: spacing(2.5)
  },
  profileCont: {
    marginTop: spacing(1.5),
    marginBottom: spacing(5),
    '& h4': {
      fontSize: spacing(3.5)
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profilAvatar: {
    width: spacing(10),
    height: spacing(10),
    backgroundColor: palette.primary.main,
    '& svg': {
      color: palette.primary.contrastText,
      fontSize: spacing(5)
    }
  },
  appBar: { alignItems: 'center', boxShadow: 'none', marginBottom: spacing(2.5) },
  fix: {
    [breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  detailsContainer: {
    paddingLeft: 7,
    '& > div': {
      marginTop: spacing(1.5)
    }
  }
}))