import React, { useEffect, useState } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  let [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: Date.now(),
      url: 'www.github.com',
      techs: ['Node', 'React'],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
