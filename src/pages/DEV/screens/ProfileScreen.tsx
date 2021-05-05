import {
  Avatar,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useContext } from 'react'

// importing context
import { AuthContext } from '../../../context/AuthContext'



const ProfileScreen = () => {


  const { user } = useContext(AuthContext)

  const css = useCSS()

  return (
    <div className={css.root}>
      <div className={css['header-section']} />
      <div className={css['wrapper-container']}>
        <div className={css['profile-card']}>
          <div>
            <Typography variant="h5" color="textPrimary">
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              {user.employeeId}
            </Typography>
          </div>
          <Avatar className={css.avatar}>{user.name[0].toUpperCase()}</Avatar>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen

const useCSS = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    backgroundColor: palette.background.default,
    position: 'relative',
    boxSizing: 'border-box',
    zIndex: 1,
    display: 'block',
    width: '100%'
  },
  'header-section': {
    zIndex: -1,
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'block',
    height: spacing(36),
    backgroundColor: palette.common.white,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  'profile-card': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  'wrapper-container': {
    padding: spacing(3),
    [breakpoints.up('md')]: {
      padding: spacing(2)
    }
  },
  avatar: {
    backgroundColor: palette.primary.main,
    color: palette.secondary.main,
    width: spacing(8),
    height: spacing(8),
    fontSize: spacing(4)
  }
}))