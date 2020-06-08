import React from 'react';
import { View,TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import styles from './styles';


const Points = () => {
  const navigation = useNavigation();
  
  const url = "http://192.168.0.114:3333/uploads/";


  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateToDetail(){
    navigation.navigate('Detail');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}> Bem vindo.</Text>
        <Text style={styles.description}> Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} 
          initialRegion={{
            latitude: -27.2092052,
            longitude: -49.6401092,
            latitudeDelta: 0.014,
            longitudeDelta: 0.014
          }} >
            <Marker 
            style={styles.mapMarker} 
            onPress={handleNavigateToDetail}
            coordinate={{
               latitude: -27.2092052,
               longitude: -49.6401092,
            }} >
              <View>
                <Image style={styles.mapMarkerImage} source={{uri: 'https://picsum.photos/536/354'}}/>
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>  
             
            </Marker>
          </MapView>
        </View>
        
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:30}}
        >
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={url+"lampadas.svg"} />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
        </ScrollView>
        

      </View>
    </>
  );
}

export default Points;