import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();
  const route = useRoute ();

  const handleGoBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Tela About: {route.params?.name}</Text>
      <Button title="Go Back" onPress={handleGoBackClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default About;
