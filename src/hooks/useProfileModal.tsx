import React from 'react'
import {
  Dialog,
  Slide,
  withStyles,
  fade,
  Avatar,
  DialogContent,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import {
  FiX as CloseIcon,
  FiUser as AvatarIcon
} from 'react-icons/fi'
import { TransitionProps } from '@material-ui/core/transitions'

// Styles
const Popup = withStyles(theme => ({
  scrollPaper: {
    position: 'relative',
    backdropFilter: `blur(${theme.spacing(0.5)}px)`,
    backgroundColor: fade(theme.palette.background.paper, 0.1)
  },
  paper: {
    position: 'absolute',
    top: '18%',
    [theme.breakpoints.down('sm')]: {
      top: 'auto',
      bottom: theme.spacing(0)
    }
  }
}))(Dialog)

const useCSS = makeStyles(theme => ({
  title: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1.25)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.common.white
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    '& > svg': {
      fontSize: theme.spacing(5),
      color: theme.palette.secondary.main
    }
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Types
interface ModalPropsTypes {
  children: React.ReactNode
}
interface UseDialogTypes {
  onClose: () => void
}
// components
const useDialog = ({ onClose }: UseDialogTypes) => {

  const [open, setOpen] = React.useState(false);


  const openModal = () => setOpen(true)

  const closeModal = () => setOpen(false)

  const css = useCSS()

  const Modal = ({ children }: ModalPropsTypes) => (
    <Popup
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div>
        <div className={css.title}>
          <span />
          <IconButton
            edge="end"
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={css.avatarContainer}>
          <Avatar className={css.avatar}>
            <AvatarIcon />
          </Avatar>
        </div>
      </div>
      <DialogContent>
        {children}
      </DialogContent>
    </Popup>
  )

  return ({
    Modal,
    openModal,
    closeModal
  });
}

export default useDialog;