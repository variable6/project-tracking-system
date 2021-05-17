import { Checkbox, List, ListItem, FormControlLabel, makeStyles, IconButton, fade, TextField, Typography, Paper } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import { FiCoffee, FiTrash2 } from 'react-icons/fi'
import { v1 as setId } from 'uuid'
import axiosConfig from '../config/axiosConfig'
import storage from '../config/localStorageConfig'
import shadow from '../constants/backgroundShadow'
import { AuthContext } from '../context/AuthContext'
import useFormField from '../hooks/useFormField'
import PageContainer from '../pages/DEV/layouts/PageContainer'
import BreadCrumbs from './Breadcrumbs'
import Button from './Button'
import Card from './Card'

interface TodoType {
  id: string
  isDone: boolean
  note: string
}

export const TodosCard = () => {

  const { user } = useContext(AuthContext)

  const css = useCSS()
  const todosLS = storage.get('TODOS')

  const [todos, setTodos] = useState<TodoType[]>(todosLS ? todosLS : [])

  const todoField = useFormField('')

  const saveTodos = (todoList: TodoType[]) => {
    setTodos(todoList)
    storage.add('TODOS', todoList)
    axiosConfig()
      .post('/todo/update', {
        _id: user._id,
        todos: todos
      })
      .then(() => null)
      .catch(() => console.log('ERROR WHILE UPDATING TODOS'))
  }

  const addTodo = () => {
    setTodos([...todos, { note: todoField.value, isDone: false, id: setId() }])
    todoField.reset()
  }

  const toggleTodoDone = (id: string) => {
    setTodos(todos.map(todo => ({
      ...todo,
      isDone: todo.id === id ? !todo.isDone : todo.isDone
    })))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => saveTodos(todos), [todos])

  useEffect(() => {
    axiosConfig()
      .get(`/todos/${user._id}`)
      .then(({ data }) => {
        console.log(data)
        if (data)
          setTodos(data.todos)
        else {
          saveTodos([])
        }
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <Card title="Todos">
      <form className={css.form} onSubmit={e => { e.preventDefault(); addTodo() }} >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Add todo..."
          value={todoField.value}
          onChange={todoField.onChange}
        />
        <span />
        <Button.Primary label="add" type="submit" disabled={todoField.value.length === 0} />
      </form>
      <List>
        {
          todos.length === 0 ? (
            <NoTodos />
          ) : todos.map(todo => (
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.isDone}
                    onChange={() => toggleTodoDone(todo.id)}
                    color="primary"
                  />
                }
                className={`${css.checkBox} ${todo.isDone && css.checked}`}
                label={todo.note}
              />
              <IconButton className={css.trash} onClick={() => deleteTodo(todo.id)}>
                <FiTrash2 />
              </IconButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}

export const TodoScreen = () => {

  const { user } = useContext(AuthContext)

  const css = useCSS()
  const todosLS = storage.get('TODOS')

  const [todos, setTodos] = useState<TodoType[]>(todosLS ? todosLS : [])

  const todoField = useFormField('')

  const saveTodos = (todoList: TodoType[]) => {
    setTodos(todoList)
    storage.add('TODOS', todoList)
    axiosConfig()
      .post('/todo/update', {
        _id: user._id,
        todos: todos
      })
      .then(() => null)
      .catch(() => console.log('ERROR WHILE UPDATING TODOS'))
  }

  const addTodo = () => {
    setTodos([...todos, { note: todoField.value, isDone: false, id: setId() }])
    todoField.reset()
  }

  const toggleTodoDone = (id: string) => {
    setTodos(todos.map(todo => ({
      ...todo,
      isDone: todo.id === id ? !todo.isDone : todo.isDone
    })))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => saveTodos(todos), [todos])

  useEffect(() => {
    axiosConfig()
      .get(`/todos/${user._id}`)
      .then(({ data }) => {
        console.log(data)
        if (data)
          setTodos(data.todos)
        else {
          saveTodos([])
        }
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <PageContainer>
      <div className={css.root}>
        <Typography variant="h5" color="textPrimary">Todos</Typography>
        <div style={{ height: 18 }} />
        <BreadCrumbs currentPage="Todos" links={[{ path: '/', label: 'Dashboard' }]} />
        <Card title="Add Todo">
          <form className={css.form} onSubmit={e => { e.preventDefault(); addTodo() }} >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Add todo..."
              value={todoField.value}
              onChange={todoField.onChange}
            />
            <span />
            <Button.Primary label="add" type="submit" disabled={todoField.value.length === 0} />
          </form>
        </Card>
        <Paper elevation={0} className={css.paper}>
          <List>
            {
              todos.length === 0 ? (
                <NoTodos />
              ) : todos.map(todo => (
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={todo.isDone}
                        onChange={() => toggleTodoDone(todo.id)}
                        color="primary"
                      />
                    }
                    className={`${css.checkBox} ${todo.isDone && css.checked}`}
                    label={todo.note}
                  />
                  <IconButton className={css.trash} onClick={() => deleteTodo(todo.id)}>
                    <FiTrash2 />
                  </IconButton>
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </div>
    </PageContainer>
  )
}

const NoTodos = () => {
  const css = useCSS()
  return (
    <div className={css.offline}>
      <FiCoffee className={css.offlineIcon} />
      <Typography variant="h5" color="textPrimary">You are done.</Typography>
      <Typography variant="body1" color="textSecondary">
        No todos to do<br />Add a todo now.
      </Typography>
    </div>
  )
}


const useCSS = makeStyles(({ palette, spacing }) => ({
  checkBox: {
    flex: 1,
    '& span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1': {
      width: '100%',
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
    }
  },
  checked: {
    '& span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1': {
      'text-decoration': 'line-through',
      color: palette.text.disabled
    }
  },
  listItem: {
    display: 'flex',
  },
  trash: {
    backgroundColor: fade(palette.error.light, 0.15),
    color: palette.error.main,
    '&:hover': {
      backgroundColor: fade(palette.error.light, 0.2)
    }
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    '& > *:nth-child(1)': {
      flex: 1,
      marginRigth: spacing(1.5)
    },
    '& > span': {
      display: 'block',
      width: spacing(1.2)
    }
  },
  root: {
    width: '100%',
    minHeight: '100%',
    padding: spacing(2.25),
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    marginTop: spacing(2),
    filter: shadow
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
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
    fontSize: spacing(12.5),
    color: '#888'
  }
}))