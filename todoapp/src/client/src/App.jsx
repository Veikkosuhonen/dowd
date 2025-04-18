import styles from './App.module.css';
import { For, createResource, createSignal } from 'solid-js';

const [todos, setTodos] = createSignal([
  { id: 1, text: 'Learn SolidJS', completed: false },
  { id: 2, text: 'Build a Todo App', completed: false },
]);

function App() {
  const [hash] = createResource(async () => {
    const res = await fetch('/api/hash')
    return res.text()
  })

  const [newTodo, setNewTodo] = createSignal('');

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src="/api/image" class={styles.logo} alt="image" />
        <p>
          {hash()}
        </p>
      </header>
      <main>
        <h1>The project App</h1>
        <ul>
          <For each={todos()}>
            {(todo) => (
              <li>
                <input type="checkbox" checked={todo.completed} />
                {todo.text}
              </li>
            )}
          </For>
        </ul>
        <div>
          <input type="text" value={newTodo()} onInput={(e) => setNewTodo(e.target.value)} maxLength={140}/>
          <button onClick={() => {
            const newTodos = [...todos(), { id: Date.now(), text: newTodo(), completed: false }];
            setTodos(newTodos);
            setNewTodo('');
          }}>
            Add
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
