import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
export default function Dashboard(){

    const [spots, setSports] = useState([]);
    //useEffect é uma função.
    //função passada no primeiro parâmetro é executada sempre que as variáveis
    //listadas no array de dependencias(segundo parametro) sofrerem alguma modificação.
    // o array vazio diz que a função no userEffect só executará uma única vez.
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            console.log(user_id);
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSports(response.data);
            console.log(response.data);
        }
        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{
                            backgroundImage: `url(${spot.thumbnail_url})`
                        }}/>
                        <strong>{ spot.company }</strong>
                        <span>{ spot.price ? `R$${spot.price}/dia`: 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="New">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}