import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  //estado inicial configurado para uma string vazia.
  //recuperando o e-mail e a função setEmail do estado do componente.
  const [email, setEmail] = useState('');

  async function handleSubmit(event){
    //Previnindo o funcionamento padrão 
    //de enviar para outra tela.
    event.preventDefault();
    //enviando o email digitado para a API Node. 
    const response = await api.post('/sessions', { email });
    //recuperando o id do usuário cadastrado na responta da requisição.
    const { _id } = response.data;
    //armazenando o usuário cadastrado no cash do navegador.
    localStorage.setItem('user', _id);
    //propriedade usada para navegação. Neste caso, ele está enviar o usuário para o /dashboard.
    
    console.log(_id);
    history.push('/dashboard');
  }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores
        e encontre <strong>talentos</strong> para sua empresa
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} id="email" placeholder="Seu e-mail mais usado." />

                <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    );
}