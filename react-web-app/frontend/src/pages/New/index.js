import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './styles.css';

export default function New({ history }) {

    const [company, setCompany] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [price, setPrice] = useState('');

    const [thumbnail, setThumbnail] = useState(null);

    //função similar à useEffect, uma função é executada quando alguma variável sofre alteração.
    //Neste caso, sempre que a variável thumbnail foi alterada, uma url será gerada (temporaria usando a global URL) 
    //e retornada.
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail): null;
        }, [thumbnail]
    );

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('technologies', technologies);
        data.append('price', price);
        
        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
                className= {thumbnail? 'has-thumbnail': ''}
                style ={{backgroundImage:`url(${preview})`}}>
                <input type="file" onChange= {event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="selecione uma imagem." />
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input id="company"
                placeholder="Sua empresa de sucesso."
                value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="technologies">TECNOLOGIAS * <span>(separados por vírgula)</span></label>
            <input id="technologies"
                placeholder="Quais suas principais tecnologias?"
                value={technologies}
                onChange={event => setTechnologies(event.target.value)} />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input id="price"
                placeholder="Valor cobrado por dia."
                value={price}
                onChange={event => setPrice(event.target.value)} />

        <button type="submit" className="btn">Cadastrar</button>
        <br/>
        <Link to="/dashboard">
            <button className="btn">Voltar</button>
        </Link>
        </form>
    )
}