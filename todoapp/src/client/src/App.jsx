import styles from './App.module.css';
import { For, createResource, createSignal } from 'solid-js';

const [todos, { refetch }] = createResource(async () => {
  const res = await fetch('/todos');
  return res.json();
})

const postTodo = async (todo) => {
  const res = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return res.json();
}

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
                {todo.title}
              </li>
            )}
          </For>
        </ul>
        <div>
          <input type="text" value={newTodo()} onInput={(e) => setNewTodo(e.target.value)} maxLength={140}/>
          <button onClick={async () => {
            const newTodoBody = { id: Date.now(), title: newTodo(), completed: false };
            await postTodo(newTodoBody)
            refetch();
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
