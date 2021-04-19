import { Drawer, makeStyles, withStyles, Typography, TextField } from "@material-ui/core";
import { useEffect, useRef, useState, useContext } from "react";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import FormLoader from "../../../../components/FormLoader";
import axiosConfig from "../../../../config/axiosConfig";
import { AlertContext } from '../../../../context/AlertContext'

const Model = withStyles(({ breakpoints }) => ({
  root: {
    display: ', TextFieldgrid',
    placeItems: 'center',
  },
  paper: {
    height: '100vh',
    marginBottom: 'auto',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)'
  }
}))(Drawer)

const ProjectDelete = (props: {
  isOpen: boolean,
  closeDelete: () => void,
  projectDetails: {
    projectId: string,
    projectTitle: string
  }
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeDelete = () => {
    setIsSubmitting(false)
    props.closeDelete()
  }

  const css = useCSS()
  const { projectTitle, projectId } = props.projectDetails

  const { openAlert } = useContext(AlertContext)

  const pwdRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {

    const handleClick = ({ target }: any) => {

      if (target.id && target.id === 'close-delete-modal')
        closeDelete()
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  })

  const deleteHandler = () => {
    if (navigator.onLine) {
      setIsSubmitting(true)
      axiosConfig()
        .post('bdm/project/remove', {
          password: pwdRef ? pwdRef.current?.value : '',
          projectId
        })
        .then(({ data }) => {
          setIsSubmitting(false)
          openAlert({
            type: data.type,
            message: data.message
          })
          closeDelete()
        })
        .catch(error => {
          setIsSubmitting(false)
          if (error.response.data) {
            const data = error.response.data
            openAlert({
              message: data.message,
              type: data.type
            })
          } else {
            openAlert({
              type: 'error',
              message: 'Something went wrong'
            })
          }
          formRef.current?.reset()
        })
    }
    else
      openAlert({
        type: 'error',
        message: 'You are offline now'
      })
  }

  return (
    <Model
      variant="temporary"
      anchor="bottom"
      open={props.isOpen}
      onClose={closeDelete}
    >
      <section className={css.container} id="close-delete-modal">
        <div className={css.modal}>
          <Card title={isSubmitting ? 'Deleting...' : "Are you sure?"}>
            <div style={{ position: 'relative' }}>
              {isSubmitting && <FormLoader />}
              <Typography variant="body1" color="secondary">
                To delete the project <strong>{projectId} - {projectTitle}</strong>, enter your password to confrim.
              </Typography>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  deleteHandler()
                }}
                className={css.form}
                ref={formRef}
              >
                <TextField required
                  id="delete-project-password"
                  placeholder="Confrim password"
                  inputRef={pwdRef}
                  variant="outlined"
                  size="small"
                  type="password"
                />
                <div className={css.btn} >
                  <Button.Secondary label="No" onClick={closeDelete} />
                  <Button.Primary type="submit" label="Yes, I'm" onClick={() => null} />
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </Model>
  );
}

export default ProjectDelete;

const useCSS = makeStyles(({ breakpoints, palette, spacing }) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    [breakpoints.up('sm')]: {
      alignItems: 'center',
      bacKdropFilter: 'blur(5px)'
    }
  },
  modal: {
    width: spacing(60),
    [breakpoints.down(spacing(60.01))]: {
      width: '95vw'
    }
  },
  form: {
    marginTop: spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing(1.5),
    marginTop: spacing(1.5)
  }
}))