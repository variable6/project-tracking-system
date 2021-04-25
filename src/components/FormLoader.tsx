import { makeStyles, LinearProgress, fade } from '@material-ui/core'

const css = makeStyles(theme => ({
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backdropFilter: 'blur(3px)',
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    zIndex: 10
  },
  loader: {
    height: theme.spacing(0.65),
    width: '100%'
  }
}))

const FormLoader = () => (
  <div className={css().loaderContainer}>
    <LinearProgress className={css().loader} />
  </div>
)

export default FormLoader