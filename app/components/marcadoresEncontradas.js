import React, {useState, useEffect}from 'react'
import {StyleSheet, View,Text,Button,ActivityIndicator,Image} from 'react-native'
import openMap from 'react-native-open-maps'
import MapView from 'react-native-maps'
import { Marker, Callout,CalloutSubview } from 'react-native-maps';
import Carousel from 'react-native-banner-carousel'
import * as firebase from 'firebase';

export default function Map(props){

    const {navigation} = props;
    const {mascotas} = navigation.state.params;
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [imageMascota, setImageMascota] = useState([]);
    const [images, setImages] = useState(null);
    const arrayUrls = [];

    return(
      <View>
   
        <MapView
        mapType='standard'
        
        style={{height: '100%', width: '100%'}}
        initialRegion={{
            latitude: 10.312561948962202,
            longitude: -75.40532575920224,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
            zoom: 100,
          }}
          
>
  
{mascotas.map(marker => <Pets marker={marker}  navigation={navigation}/>)}
  
</MapView>

      
</View>
    )

}

function Pets(props){
  const {marker,navigation} = props;
  const {images,name,description} = marker.pet;
  const [imageMascota, setImageMascota] = useState(null);
  
  useEffect(() => {
     
      const image = images[0];
     
      firebase.storage()
      .ref(`mascotas-imagenes-encontradas/${image}`)
      .getDownloadURL()
      .then(result => {
          setImageMascota(result);
          
          
      });
  });
  

  return(
    <View> 
    <Marker
         
      pinColor='#f4511e'
      coordinate={{latitude: marker.pet.location.latitude,
        longitude: marker.pet.location.longitude}}
    >
      <Callout style={styles.plainView} onPress={() => navigation.navigate('MascotaMarker',{marker})}>
             
              <View>
                <Text  accessibilityRole='image' style={{marginTop: -90}}>
                   <Image style={{ height: 200, width:200 }} source={{uri: imageMascota}}resizeMode="cover" />
                   
                </Text>    
                 
                <Text>{name}</Text>
                <Text>{description}</Text>
              </View>
      </Callout>
    </Marker>

   
      </View> 
      
  );
}
const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: 200,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageMascota: {
    width: 80,
    height: 80,
    
    
    
},

    viewMascotaImage: {
        marginRight: 15
    },
    indicator: {
      backgroundColor: '#00a680'
  },
  indicatorActive: {
      backgroundColor:'#00ffc5'
  }
});