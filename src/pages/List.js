import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List () {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(user_id => {
        const socket = socketio('http://192.168.15.25:3333', {
          query: { user_id }
        })
        socket.on('booking_response', booking  => {
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
        })
      });
  }, []);
  useEffect(() => {
    AsyncStorage
      .getItem('techs')
      .then(storedTechs => {
        const techsArray = storedTechs
          .split(',')
          .map(tech => tech.trim());
        setTechs(techsArray);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={logo}
      />
      <ScrollView>
        {techs.map(tech => <SpotList
          tech={tech}
          key={tech}
        />)}
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
    marginTop: 10,
  }
})