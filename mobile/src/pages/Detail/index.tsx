import React from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { View,Image,Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


import styles from './styles';


// testando ;b
const Detail = () => {
  const navigation = useNavigation();
  
  const url = "http://192.168.0.114:3333/uploads/";


  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateToDetail(){
    navigation.navigate('Detail');
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{uri: 'https://picsum.photos/536/354'}}/>

        <Text style={styles.pointName}>Mercado Teste</Text>
        <Text style={styles.pointItems}>Lâmpadas, Óleo de Cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Santarém - Pará</Text>
        </View>

      </View>  
      <View style={styles.footer}>
        <RectButton style={styles.button}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton> 

        <RectButton style={styles.button}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton> 
      </View>
    </SafeAreaView>
  )
}

export default Detail;