import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();
  
  const ongId = localStorage.getItem('ongId'); //buscar salvas no browser
  const ongName = localStorage.getItem('ongName');
  //useffect para determinar quando executar um componente
  useEffect(() => { // 1param os dados exib 2param quando atualiza-los
    api.get('profile', {
      headers: { // header para passar qual ong esta logada
        authorization: ongId, 
      }
    }).then(reponse => { // .then para buscar os dados da ong
      setIncidents(reponse.data); // dados salvos no state
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('something went wrong, try again.');
    }
  }

  function handleLogout() {
    localStorage.clear(); // limpar dados do local storage

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Welcome {ongName}</span>

        <Link className="button" to="/incidents/new">Create new incident</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Registered Incidents</h1>

      <ul> 
        {incidents.map(incident => ( //map feito para percorrer todos os casos
          <li key={incident.id} > {/* repetir o primeiro tem que ter uma key*/} 
            <strong>INCIDENT:</strong> 
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>IMPORTANCE:</strong>
            <p>{Intl.NumberFormat('eng-UK', { style: 'currency', currency: 'GBP'}).format(incident.value)}</p> {/* formatar dinheiro */}

            <button onClick={() => handleDeleteIncident(incident.id)} type="button"> {/* arrow func criara para conseguir passar param */}
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))} 
      </ul> 
    </div> 
  );
}