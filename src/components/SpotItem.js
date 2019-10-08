import React from 'react';
import { withNavigation } from 'react-navigation';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SpotItem ({ item, navigation }) {
  function handleNavigate (id) {
    navigation.navigate('Book', { id });
  }
  return (
    <View style={styles.listItem}>
      <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.price}>{item.price ? `R$${item.price}` : 'GRATUITO'}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate(item._id)}
      >
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotItem);