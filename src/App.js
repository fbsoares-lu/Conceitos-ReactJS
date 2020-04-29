import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    
    const repositories = response.data;
    setRepository([...repository, repositories]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepository(repository.filter(
      repositories => repositories.id != id
    ))
  }

  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []); 

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repositories => <li key={repositories.id}>
          {repositories.title}
          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>

        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
