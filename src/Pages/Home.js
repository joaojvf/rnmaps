import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleAboutClick = () => {
    navigation.navigate('About');
  };

  const handleSendClick = () => {
    navigation.navigate('About', {
        name
    });
  };

  return (
    <View style={styles.container}>
      <Text>Tela home</Text>
      <TextInput
        styles={styles.teste}
        value={name}
        onChangeText={t => setName(t)}
      />
      <Button title="Go About" onPress={handleAboutClick} />
      <Button title="Send" onPress={handleSendClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teste: {
    width: 250,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#eee',
    borderRadius: 25,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: 'red',
  },
});

export default Home;
