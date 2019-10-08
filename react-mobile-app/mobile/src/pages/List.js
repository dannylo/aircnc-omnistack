import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, ScrollView, Image, AsyncStorage, Text, View } from 'react-native';
import socketio from 'socket.io-client';

import logo from '../../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('technologies').then(techsStoraged => {
            const techsArray = techsStoraged.split(',').map(tech => tech.trim());

            setTechnologies(techsArray);

        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket =  socketio('http://localhost:3333', {
                query: { user },
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved? 'APROVADA': 'REJEITADA'}`)
            })
        })

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {technologies.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30
    },
});