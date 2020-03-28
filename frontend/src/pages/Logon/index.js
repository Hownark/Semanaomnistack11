import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heoresImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id); //armazenar informacoes no browser
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Login failed');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>

                    <input 
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />

                    <button className="button" type="submit">Sign In</button>

                    <Link className="back-link " to="/register">
                        <FiLogIn size={16} color="#E02141" />
                        Not registered yet?
                    </Link>
                </form>
            </section>

            <img src={heoresImg} alt="Heroes"/>
        </div>
    );
}
