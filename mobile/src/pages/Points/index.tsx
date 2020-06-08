import React, { useEffect } from 'react';
import { View,TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { useState } from 'react';


import styles from './styles';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}


const Points = () => {
  const navigation = useNavigation();
  
  const [items,setItems] = useState<Item[]>([]);
  const [selectedItems,setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    api.get('items').then(response =>{
        setItems(response.data);
    })
  },[]);


  function handleNavigateBack(){
    navigation.goBack();
  }

  function handleNavigateToDetail(){
    navigation.navigate('Detail');
  }

  
  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item=> item === id);

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id);

        setSelectedItems(filteredItems);
    }else{
        setSelectedItems([...selectedItems, id]);
    }
    
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
              <View style={styles.mapMarkerContainer}>
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
          {items.map((item => (
            <TouchableOpacity 
              key={String(item.id)} 
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={()=>handleSelectItem(item.id)}
              activeOpacity={0.5}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          )))}
        

        </ScrollView>
      </View>
    </>
  );
}

export default Points;        

