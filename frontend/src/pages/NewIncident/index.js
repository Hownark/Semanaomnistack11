import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident (e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Something went wrong, try again');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>

          <h1>Register new incident</h1>
          <p>Describe the incident with some details to find a hero capable of sorting it out</p>

          <Link className="back-link " to="/profile">
            <FiArrowLeft size={16} color="#E02141" />
             Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Incident title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)} 
          />
          <input 
            placeholder="Importance"
            value={value}
            onChange={e => setValue(e.target.value)} 
          />  

          <button className="button" type="submit">Register</button> 
        </form>
      </div>
    </div>
  );
}