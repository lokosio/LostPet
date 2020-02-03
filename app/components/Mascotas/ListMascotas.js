import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity,RefreshControl} from 'react-native'
import {Image} from 'react-native'

import * as firebase from 'firebase';
function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function ListMascotas(props){
   const {mascotas, isLoading, setIsLoading,handleLoadMore, navigation,setIsRealoadMascota,isReloadMascota} = props;
   const item = mascotas[1];
  
   const onRefresh = React.useCallback(() => {
    setIsRealoadMascota(true);
    setIsLoading(true)
    console.log('3--'+isReloadMascota+'--3')
    wait(2000).then(() => setIsRealoadMascota(false),setIsLoading(false));
    console.log('4--'+isReloadMascota+'--4')
    }, [isReloadMascota]);

    return(
      <View>
          {mascotas ? (
              <FlatList
              data={mascotas }
              renderItem={pet => <Pets pet={pet} navigation={navigation}/>}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
              ListFooterComponent={<FooterList isLoading={isLoading}/>}
              refreshControl={
                <RefreshControl refreshing={isReloadMascota} onRefresh={onRefresh} />
              }
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
    
    
    useEffect(() => {
        const image = images[0];
        firebase.storage()
        .ref(`mascotas-imagenes/${image}`)
        .getDownloadURL()
        .then(result => {
            setImageMascota(result);
        });
    });
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate('Mascota',{pet})}>
            <View style={styles.viewMascota}>
              <View style={styles.viewMascotaImage}>
                  <Image
                    resizeMode= 'cover'
                    source={{uri: imageMascota}}
                    style={styles.imageMascota} 
                    
                    PlaceholderContent={<ActivityIndicator color='fff'/>}
                  />
              </View>
              <View>
                <Text style={styles.mascotasName}>{name}</Text>
                <Text style={styles.mascotaAddress}>{address}</Text>
                <Text style={styles.mascotaDescription}>
                    {description.substr(0, 60)}...
                </Text>
              </View>
            </View>

        </TouchableOpacity>
        
    );
}

function FooterList(props){
  const { isLoading} = props;
  console.log('5--'+isLoading+'--5')
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
        backgroundColor: '#fff',
        
        borderRadius: 50,
    },
    viewMascotaImage: {
        marginRight: 15
    },
    imageMascota: {
        width: 80,
        height: 80,
        borderRadius: 50,
        
        
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
    }
});