import React from 'react'
import {
  Dialog,
  Slide,
  withStyles,
  fade,
  DialogContent,
  makeStyles,
  IconButton, Typography
} from '@material-ui/core'
import {
  FiX as CloseIcon
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
    [theme.breakpoints.down('sm')]: {
      top: 'auto'
    }
  }
}))(Dialog)

const useCSS = makeStyles(theme => ({
  title: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1.25)}px ${theme.spacing(3)}px`
  }
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
  title: string
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

  const Modal = React.memo(function Modal({ children, title }: ModalPropsTypes) {
    return (
      <Popup
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ alignItems: 'center', justifyContent: 'space-between' }} className={css.title}>
          <Typography variant="h6" color="secondary" style={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers>
          {children}
        </DialogContent>
      </Popup>
    )
  })

  return ({
    Modal,
    openModal,
    closeModal
  });
}

export default useDialog;