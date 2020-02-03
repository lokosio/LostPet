import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert} from 'react-native'
import {Image,Icon} from 'react-native-elements'
import * as firebase from 'firebase';


export default function ListMascotas(props){
   const {mascotas, isLoading, handleLoadMore, navigation} = props;
   

    return(
      <View>
        
          {mascotas ? (
              <FlatList
              data={mascotas}
              renderItem={pet => <Pets pet={pet} navigation={navigation}/>}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
              ListFooterComponent={<FooterList isLoading={isLoading}/>}
              />
          ) : (
              <View style={StyleSheet.loadingMascotas}>
                 <ActivityIndicator size='large'/>
                 <Text>cargando Mascotas</Text>
              </View>    
          )}
      </View>
     
    );
    
}

function Pets(props){
    const {pet, navigation} = props;
    const {name, address, description, images} = pet.item.pet;
    const [imageMascota, setImageMascota] = useState(null);
    const [color, setColor] = useState('');

  
    
    
    useEffect(() => {
        const image = images[0];
        firebase.storage()
        .ref(`mascotas-imagenes/${image}`)
        .getDownloadURL()
        .then(result => {
            setImageMascota(result);
           
        });
    });

    useEffect(() => {
        
        if(pet.item.pet.estado){
            
            setColor('rgb(0,200,0)')
        }else{
            setColor('rgb(255,0,0)')      
            
        }
        
    });
    

    
    
    return(
        
        <View>
        
        
        <TouchableOpacity onPress={() => navigation.navigate('Delete',{pet}) } >
            <View style={styles.viewMascota}>
              <View style={styles.viewMascotaImage}>
                  <Image
                    resizeMode= 'cover'
                    source={{uri: imageMascota}}
                    style={styles.imageMascota} 
                    PlaceholderContent={<ActivityIndicator color='fff'/>}
                  />
              </View>
              <View style={{ width:'75%'}}>
                <Text style={styles.mascotasName}>{name}</Text>
                <Text style={styles.mascotaAddress}>{address}</Text>
                <Text style={styles.mascotaDescription}>
                    {description.substr(0, 60)}...
                </Text>
                <Icon
                iconStyle={{alignSelf:  'flex-end', color: color, marginTop: -50}}
                name='paw'
                type='material-community'
                
              />
              </View>
              
            </View>

        </TouchableOpacity>
        </View>
        
    );
}

function FooterList(props){
  const { isLoading} = props;
  
  
  if(isLoading){
      return(
          <View style={styles.loadingMascotas}>
              <ActivityIndicator size='large'/>
          </View>
      )

  }else{
      return(
        <View style={styles.notFoundMascotas}>
        <Text>no quedan reportes por cargar</Text>
      </View>

      )
      

  }
}
const styles = StyleSheet.create({
    loadingMascotas: {
        marginTop: 20,
        alignItems: 'center'
    },
    viewMascota: {
        flexDirection: 'row',
        margin:  10,
       
    },
    viewMascotaImage: {
        marginRight: 15
        
    },
    imageMascota: {
        width: 80,
        height: 80
    },
    mascotasName:{
        fontWeight: 'bold'
    },
    mascotaAddress: {
        paddingTop: 2,
        color: 'grey'
    },
    mascotaDescription: {
        paddingTop: 2,
        color: 'grey',
        width: 300
    }, 
    loaderMascotas:{
        marginTop: 10,
        marginBottom: 10
    },
    notFoundMascotas:{
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    }, 
    fondo: {
        
        backgroundColor:'rgba(0,200,0,0.1)',
    
    }
});