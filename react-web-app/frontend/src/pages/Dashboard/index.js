import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import './styles.css';
export default function Dashboard(){

    const [spots, setSports] = useState([]);
    const [requests, setRequests] = useState([]);

    const user = localStorage.getItem('user');
    //O useMemo está garantindo que a conexão de socket só será refeita, caso o user seja modificado. Caso contrário, a conexão permanecerá memorizada.
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user },
    }), [user]);
    //useEffect é uma função.
    //função passada no primeiro parâmetro é executada sempre que as variáveis
    //listadas no array de dependencias(segundo parametro) sofrerem alguma modificação.
    // o array vazio diz que a função no userEffect só executará uma única vez.
   
   useEffect(() => {
        //a notação abaixo ...requests, ajuda ao comando não sobrescrever os dados do array, e sim coloca-las no final.
        socket.on('booking_request', data =>{
            setRequests([... requests, data]);
        })
   }, [requests]);
   
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

    async function handleAccept(id){
        await api.post(`/booking/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/booking/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications" >
                {requests.map(request => (
                    <li key={request.id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data <strong>{request.date}</strong>.
                        </p>
                        <button onClick={() => handleAccept(request._id)} className="accept">Aceitar</button>
                        <button onClick={() => handleReject(request._id)} className="reject">Rejeitar</button>
                    </li>
                ))}
            </ul>
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