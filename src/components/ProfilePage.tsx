import {
  makeStyles,
  Drawer, Typography, IconButton, Avatar, AppBar, Tab, Paper
} from '@material-ui/core'
import {
  useState,
  ChangeEvent,
  useContext
} from 'react'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
  FiChevronRight as CloseIcon,
  FiUser as UserIcon
} from 'react-icons/fi'
import Card from './Card'
import { ProfileContext } from '../context/ProfilePageContext'
import { AuthContext } from '../context/AuthContext'

const ProfilePage = () => {

  const { isProfileOpen, closeProfile } = useContext(ProfileContext)
  const { user } = useContext(AuthContext)

  const css = useCSS()

  const [value, setValue] = useState('1');

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Drawer
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
              <Card title="Profile">
              </Card>
            </TabPanel>
            <TabPanel value="2">qwertwy</TabPanel>
          </TabContext>
        </div>
      </div>
    </Drawer>
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
  }
}))