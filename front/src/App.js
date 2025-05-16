import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: `${apiBaseUrl}/api`
});

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  const getTodos = async () => {
    try {
      const response = await api.get('/todos');
      const data = Array.isArray(response.data) ? response.data : [];
      setTodos(data);
    } catch (error) {
      console.error('Erro ao buscar todos:', error);
      setTodos([]);
    }
  };

  const createTodo = async () => {
    try {
      await api.post('/todos', { name: inputValue });
      getTodos();
      setInputVisibility(false);
      setInputValue('');
    } catch (error) {
      console.error('Erro ao criar todo:', error);
    }
  };

  const editTodo = async () => {
    try {
      await api.put('/todos', {
        id: selectedTodo.id,
        name: inputValue
      });
      setSelectedTodo(undefined);
      setInputVisibility(false);
      getTodos();
    } catch (error) {
      console.error('Erro ao editar todo:', error);
    }
  };

  const modifyStatusTodo = async (todo) => {
    try {
      await api.put('/todos', {
        id: todo.id,
        status: !todo.status
      });
      getTodos();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await api.delete(`/todos/${todo.id}`);
      getTodos();
    } catch (error) {
      console.error('Erro ao deletar todo:', error);
    }
  };

  const handleWithNewButton = () => {
    setInputVisibility(!inputVisibility);
  };

  const handleWithEditButtonClick = (todo) => {
    setSelectedTodo(todo);
    setInputValue(todo.name);
    setInputVisibility(true);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const Todos = ({ todos }) => {
    if (!Array.isArray(todos)) {
      return <p>Erro: dados inválidos da API</p>;
    }

    return (
      <div className="todos">
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
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
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Tarefas</h1>
        </div>
        <Todos todos={todos} />
        <input
          value={inputValue}
          placeholder="Digite a tarefa aqui"
          style={{ display: inputVisibility ? 'block' : 'none' }}
          onChange={(event) => setInputValue(event.target.value)}
          className="inputName"
        />
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
  );
}

export default App;
