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
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload..
        </p>
        <p>
          {hash()}
        </p>
      </header>
    </div>
  );
}

export default App;
