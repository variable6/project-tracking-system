import { Checkbox, List, ListItem, FormControlLabel, makeStyles, IconButton, fade, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import axiosConfig from '../config/axiosConfig'
import storage from '../config/localStorageConfig'
import useFormField from '../hooks/useFormField'
import Button from './Button'
import Card from './Card'

interface TodoType {
  createdDate: Date
  isDone: boolean
  note: string
  _id: string
}

export const TodosCard = () => {

  const css = useCSS()
  const todosLS = storage.get('TODOS')

  const [todos, setTodos] = useState<TodoType[]>(todosLS ? todosLS : [])

  const todoField = useFormField('')

  const saveTodos = (todoList: TodoType[]) => {
    setTodos(todoList)
    storage.add('TODOS', todoList)
    axiosConfig()
    // .post()
    // .then()
    // .catch()
  }

  const addTodo = () => {

  }

  const toggleTodoDone = (id: string) => {
    setTodos(todos.map(todo => ({
      ...todo,
      isDone: todo._id === id ? !todo.isDone : todo.isDone
    })))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo._id !== id))
  }

  useEffect(() => saveTodos(todos), [todos])

  useEffect(() => {
    axiosConfig()
      .get('/tl/todos')
      .then(({ data }) => {
        console.log(data.todos)
        saveTodos(data.todos)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <Card title="To-dos">
      <form className={css.form} onSubmit={e => { e.preventDefault(); addTodo() }} >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Add todo..."
          value={todoField.value}
          onChange={todoField.onChange}
        />
        <span />
        <Button.Primary label="add" type="submit" />
      </form>
      <List>
        {
          todos.map(todo => (
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.isDone}
                    onChange={() => toggleTodoDone(todo._id)}
                    color="primary"
                  />
                }
                className={`${css.checkBox} ${todo.isDone && css.checked}`}
                label={todo.note}
              />
              <IconButton edge="end" className={css.trash} onClick={() => deleteTodo(todo._id)}>
                <FiTrash2 />
              </IconButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
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
  }
}))