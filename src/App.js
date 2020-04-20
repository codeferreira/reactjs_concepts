import React, {useState, useEffect} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await api.get('/repositories');

      
        setRepositories(response.data);
      } catch (err) {
        console.log(err)
      }
    }

    getRepositories();
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {title: 'Repositorio 1', url: 'https://github.com', techs: ['ReactJS']});

      setRepositories([response.data, ...repositories]);
    } catch (err) {
      console.log(err)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
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
