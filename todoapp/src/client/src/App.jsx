import logo from './logo.svg';
import styles from './App.module.css';
import { createResource } from 'solid-js';

function App() {
  const [hash] = createResource(async () => {
    const res = await fetch('/api/hash')
    return res.text()
  })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src="/api/image" class={styles.logo} alt="image" />
        <p>
          {hash()}
        </p>
      </header>
    </div>
  );
}

export default App;
