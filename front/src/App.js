import { useEffect, useState } from 'react'
import './App.css'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map(todo => {
          return (
            <div className="todo">
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? '#0059ff' : 'white' }}
              ></button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={'#64697b'} />
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={'#64697b'} />
              </button>
            </div>
          )
        })}
      </div>
    )
  }
  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility)
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisibility(true)
  }

  async function getTodos() {
    const response = await axios.get('http://44.204.161.57:3333/todos')
    setTodos(response.data)
  }

  async function editTodo() {
    await axios.put(`http://44.204.161.57:3333/todos`, {
      id: selectedTodo.id,
      name: inputValue
    })
    setSelectedTodo()
    setInputVisibility(false)
    getTodos()
  }

  async function modifyStatusTodo(todo) {
    await axios.put(`http://44.204.161.57:3333/todos`, {
      id: todo.id,
      status: !todo.status
    })
    getTodos()
  }

  async function createTodo() {
    await axios.post('http://44.204.161.57:3333/todos', {
      name: inputValue
    })
    getTodos()
    setInputVisibility(!inputVisibility)
    setInputValue('')
  }

  async function deleteTodo(todo) {
    await axios.delete(`http://44.204.161.57:3333/todos/${todo.id}`)
    getTodos()
  }

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputVisibility, setInputVisibility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState()
  useEffect(() => {
    getTodos()
  }, [])
  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Tarefas</h1>
        </div>
        <Todos todos={todos} ></Todos>
        <input
          value={inputValue}
          placeholder='Digite a tarefa aqui'
          style={{ display: inputVisibility ? 'block' : 'none' }}
          onChange={event => {
            setInputValue(event.target.value)
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisibility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisibility ? 'Confirmar' : '+ Adicionar Tarefa'}
        </button>
      </header>
    </div>
  )
}

export default App
