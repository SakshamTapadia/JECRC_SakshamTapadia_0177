import { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const containerStyle = {
    maxWidth: '480px',
    margin: '60px auto',
    fontFamily: 'sans-serif',
  };

  const rowStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  };

  const inputStyle = {
    flex: 1,
    padding: '8px 12px',
    fontSize: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const addBtnStyle = {
    padding: '8px 16px',
    fontSize: '15px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  };

  const taskRowStyle = (completed) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#999' : '#000',
  });

  const deleteBtnStyle = {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#e53935',
  };

  return (
    <div style={containerStyle}>
      <h2>Todo List</h2>
      <div style={rowStyle}>
        <input
          style={inputStyle}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter Task"
        />
        <button style={addBtnStyle} onClick={addTask}>Add</button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} style={taskRowStyle(task.completed)}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
          <button style={deleteBtnStyle} onClick={() => deleteTask(task.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
