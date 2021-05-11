import {
  FormControl,
  makeStyles,
  OutlinedInput,
  InputAdornment,
  TextField, Chip, Radio,
  RadioGroup, FormControlLabel,
  FormGroup, Checkbox, Typography, fade
} from '@material-ui/core'

import { useContext, useEffect, useState, ChangeEvent } from 'react'
import {
  FiEdit as EditIcon,
  FiXCircle as CloseIcon,
  FiWifiOff as OfflineIcon,
  FiSearch
} from 'react-icons/fi'
import { v4 as setKey } from 'uuid'

import Button from '../../../../../components/Button'
import Card from "../../../../../components/Card"
import Loader from '../../../../../components/Loader'
import axiosConfig from '../../../../../config/axiosConfig'
import { AlertContext } from '../../../../../context/AlertContext'
import { AuthContext } from '../../../../../context/AuthContext'
import { DataContext } from '../../../DataContext'



interface FormType {
  teamLeader: string
  team: string[]
}


const ProjectTeam = ({ project_id }: { project_id: string }) => {

  const { data } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const { openAlert } = useContext(AlertContext)

  const css = useCSS()

  const [state, setState] = useState({
    teamLeader: 'none',
    team: [],
    employees: data.employees.map(emp => ({
      name: `${emp.name} - ${emp.employeeId}`,
      id: emp._id
    })),
    developers: data.employees.map(emp => ({
      name: `${emp.name} - ${emp.employeeId}`,
      id: emp._id
    })).filter(emp => emp.id !== user._id),
    showDeltails: true,
    isLoading: true,
  })

  const [form, setForm] = useState<FormType>({
    teamLeader: 'none',
    team: []
  })

  const closeEdit = () => {
    setState(cur => ({ ...cur, showDeltails: true }))
    setForm({
      teamLeader: state.teamLeader,
      team: state.team.map((member: any) => member.devRef)
    })
  }

  const openEditView = () => {
    setState(cur => ({ ...cur, showDeltails: false }))
  }


  const teamOptions = [{
    label: 'Edit',
    onClick: () => {
      if (state.showDeltails)
        openEditView()
      else
        closeEdit()
    },
    icon: state.showDeltails ? <EditIcon /> : <CloseIcon />
  }]

  const cardOptions = data.role === 'PM' ? teamOptions : []

  const fetchTeams = () => {
    setState(cur => ({ ...cur, isLoading: true }))
    axiosConfig()
      .get(`/pm/teams/${project_id}`)
      .then((res) => {
        if (res.data.length) {
          setState(cur => ({
            ...cur,
            teamLeader: res.data[0].teamLeader,
            team: res.data[0].teamMembers,
            isLoading: false
          }))
          setForm(cur => ({
            ...cur,
            teamLeader: res.data[0].teamLeader,
            team: res.data[0].teamMembers.map((member: any) => member.devRef)
          }))
        }
        else
          setState(cur => ({ ...cur, isLoading: false }))
      })
      .catch(() => {
        console.log('Error while fetching teams')
        setState(cur => ({ ...cur, isLoading: false }))
      })
  }

  const formSubmitHandler = () => {
    setState(cur => ({ ...cur, isLoading: true }))
    if (form.team.length === 0)
      return openAlert({
        type: 'error',
        message: 'Team must contain atleast one team member'
      })
    else if (form.teamLeader.length === 0) return openAlert({
      type: 'error',
      message: 'Team must have a team leader'
    })
    axiosConfig()
      .post('/pm/team/update', {
        projectRef: project_id,
        teamLeader: form.teamLeader,
        teamMembers: form.team.map(member => ({ devRef: member }))
      })
      .then(({ data }) => {
        openAlert({
          type: data.type,
          message: data.message
        })
        closeEdit()
        fetchTeams()
      })
      .catch(() => openAlert({
        type: 'error',
        message: 'Error while creating/ updating team'
      }))
  }

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '')
      setState(cur => ({
        ...cur,
        employees: data.employees.map(emp => ({
          name: `${emp.name} - ${emp.employeeId}`,
          id: emp._id
        }))
      }))
    else
      setState(cur => ({
        ...cur,
        employees: cur.employees.filter(employee => employee.name.toLowerCase().includes(target.value.toLowerCase()))
      }))
  }

  const handleDevSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '')
      setState(cur => ({
        ...cur,
        developers: data.employees.map(emp => ({
          name: `${emp.name} - ${emp.employeeId}`,
          id: emp._id
        })).filter(emp => emp.id !== user._id)
      }))
    else
      setState(cur => ({
        ...cur,
        developers: cur.developers.filter(employee => employee.name.toLowerCase().includes(target.value.toLowerCase()))
      }))
  }

  const getTeamLeader = () => {
    const emp = data.employees.filter(emp => emp._id === form.teamLeader)
    if (emp.length)
      return `${emp[0].name} - ${emp[0].employeeId}`
    return 'None'
  }

  const getEmployeeName = (id: string) => {
    const emp = data.employees.filter(emp => emp._id === id)[0]
    if (emp)
      return `${emp.name} - ${emp.employeeId}`
  }

  const removeFromTeam = (member: string) => setForm(cur => ({
    ...cur,
    team: cur.team.filter(mem => mem !== member)
  }))

  const handleTL = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(cur => ({
      ...cur,
      teamLeader: (event.target as HTMLInputElement).value
    }))
  }
  const handleTeamMember = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setForm(cur => ({
        ...cur,
        team: [...cur.team, target.value]
      }))
    } else {
      setForm(cur => ({
        ...cur,
        team: cur.team.filter(member => member !== target.value)
      }))
    }
    console.log(form.team.includes(target.value));
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    setForm(cur => ({
      ...cur,
      team: cur.team.filter(emp => emp !== form.teamLeader)
    }))
  }, [form.teamLeader])


  if (!navigator.onLine)
    return (
      <div className={css.offline}>
        <OfflineIcon className={css.offlineIcon} />
        <Typography variant="h5" color="textPrimary">
          You are offline now.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Check your internet connection to view more details.
        </Typography>
      </div>
    )

  if (state.isLoading)
    return (
      <div className={css.loader}>
        <Loader />
      </div>
    )

  const details = (
    <div className={css.form}>
      {
        state.teamLeader === 'none' && state.team.length === 0
          ? (
            <div className={css.info} >
              <Typography variant="h6" color="textPrimary">
                No team created yet.
              </Typography>
              <Typography variant="body1" color="textPrimary">
                There is no team to show.<br />Create a team now.
              </Typography>
              <Button.Primary className={css.createBtn} label="create now" onClick={openEditView} />
            </div>
          ) : (
            <>
              <label>Team Leader</label>
              <TextField className={css.textField} variant="outlined"
                size="small" disabled value={getEmployeeName(state.teamLeader)}
              />
              <label>Team Members</label>
              <div className={css.teamContainer}>
                {
                  state.team.map((member: any) => (
                    <div>
                      <Typography variant="body1" component="p" color="textPrimary">
                        {getEmployeeName(member.devRef)}
                      </Typography>
                    </div>
                  ))
                }
              </div>
              <label style={{ marginBottom: 10, marginTop: 15 }}>Total team members: {state.team.length}</label>
            </>
          )
      }
    </div >
  )

  return (
    <>
      <Card title="Project Team" options={cardOptions} >
        {
          state.showDeltails ? details : (
            <form className={css.form} onSubmit={e => {
              e.preventDefault()
              formSubmitHandler()
            }}>
              <label>Team Leader</label>
              <TextField className={css.textField} color="secondary" variant="outlined"
                size="small" disabled value={getTeamLeader()} />
              <FormControl variant="outlined" size="small" style={{ flexGrow: 1, marginBottom: 10 }}>
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
              <label>Select team leader</label>
              <FormControl component="fieldset" className={css.container} style={{ maxHeight: 270 }}>
                <RadioGroup aria-label="Developers" name="teamLeader"
                  value={form.teamLeader} onChange={handleTL}>
                  {
                    state.employees.map(emp => (
                      <FormControlLabel key={setKey()} value={emp.id} control={<Radio color="primary" />} label={emp.name} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
              {
                form.team.length === 0 ? null : (
                  <>
                    <label>Team members</label>
                    <div>
                      {
                        form.team.map(member => (
                          <Chip label={getEmployeeName(member)} key={setKey()}
                            onDelete={() => removeFromTeam(member)} className={css.chip} />
                        ))
                      }
                    </div>
                    <label style={{ marginBottom: 10 }}>Total team members: {form.team.length}</label>
                  </>
                )
              }
              <FormControl variant="outlined" size="small" style={{ flexGrow: 1, marginBottom: 10 }}>
                <OutlinedInput key={setKey()}
                  id="dev-search"
                  placeholder="Search..."
                  startAdornment={
                    <InputAdornment position="start">
                      <FiSearch />
                    </InputAdornment>
                  }
                  onChange={handleDevSearch}
                />
              </FormControl>
              <label>Choose team members</label>
              <FormControl component="fieldset" className={css.container}>
                <FormGroup>
                  {
                    state.developers.filter(emp => emp.id !== form.teamLeader).map(emp => (
                      <FormControlLabel key={setKey()}
                        control={<Checkbox color="primary" value={emp.id} checked={form.team.includes(emp.id)} onChange={handleTeamMember} />}
                        label={emp.name}
                      />
                    ))
                  }
                </FormGroup>
              </FormControl>
              <div className={css.btnContainer}>
                <Button.Primary label="add" type="submit" />
                <Button.Secondary label="cancel" onClick={closeEdit} />
              </div>
            </form>
          )
        }
      </Card>
    </>
  )
}

export default ProjectTeam

const useCSS = makeStyles(({ spacing, palette, shape }) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      fontSize: spacing(1.85),
      color: palette.secondary.main,
      fontWeight: 600
    }
  },
  textField: {
    '& input': {
      color: palette.secondary.main
    },
    marginBottom: spacing(1.25)
  },
  container: {
    maxHeight: spacing(50),
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.background.default,
    borderRadius: shape.borderRadius,
    marginBottom: spacing(2),
    padding: spacing(1)
  },
  chip: {
    backgroundColor: palette.common.white,
    margin: spacing(1)
  },
  loader: {
    margin: spacing(5),
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    '& > *': {
      marginLeft: spacing(2)
    }
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing(1.5)
  },
  createBtn: {
    borderRadius: spacing(999)
  },
  teamContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      backgroundColor: palette.background.default,
      margin: spacing(0.25),
      padding: spacing(0.75),
      borderRadius: shape.borderRadius,
      '& p': {
        paddingLeft: spacing(1),
        fontSize: spacing(2.5)
      }
    }
  },
  offline: {
    margin: spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing(1.5),
  },
  offlineIcon: {
    fontSize: spacing(15),
    color: '#888'
  }
}))