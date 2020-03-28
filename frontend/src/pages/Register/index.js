import React, { useState } from 'react'; // state para armazenar as inf dos inputs
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState(''); // um state para cada dado dos input
  const [email, setEmail] = useState(''); // 1 valor e 2 funcao para altera-lo
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) { //fazer cadastro usuario
    e.preventDefault(); // evitar carregamento da pagina

    const data ={ //dados armazenados nos states
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try { //emvio a api com try e catch para ser mais facil de monitorar
      const response = await api.post('ongs', data); // rota e dados a serem env

      alert(`Your Login ID: ${response.data.id}`);

      history.push('/'); // forcar a troca de pag apos finalizar operacao
    } catch (err) {
      alert('Register failed, try again.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>

          <h1>Register</h1>
          <p>Register yourself, join the community and help people finding your ONGs cases</p>

          <Link className="back-link " to="/">
            <FiArrowLeft size={16} color="#E02141" />
             Not registered yet?
          </Link>
        </section>

        <form onSubmit={handleRegister}> 

          <input 
            placeholder="ONG name"
            value={name} // o que sera o input
            onChange={e => setName(e.target.value)} // definir o valor do input
          />

          <input type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />  

            <input 
              placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />  
          </div>    

          <button className="button" type="submit">Register</button> 
        </form>
      </div>
    </div>
  )
}