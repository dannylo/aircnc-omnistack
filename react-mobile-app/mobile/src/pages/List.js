import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView,  ScrollView, Image, AsyncStorage, Text, View } from 'react-native';
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

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                { technologies.map(tech => <SpotList key={tech} tech={tech} />) }
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
     },
     logo :{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30
     },
});