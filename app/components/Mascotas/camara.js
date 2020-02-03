import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,  StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {Icon,Button} from 'react-native-elements';
export default function App(props) {
  
  const{navigation}= props;
  const{imageSnap,setImageSnap} = navigation.state.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  let camera;

    async function takePicture(){

      if( camera ) {
        const options = {quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        setImageSnap([...imageSnap, data.uri]);
        console.log('aqui entro')
        navigation.navigate('addMascotaEncontrada')
      }
    }

    function activarFlash(){
      setFlash(Camera.Constants.FlashMode.on)
    }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera  ref={ref => (camera = ref)}
      style={{ flex: 1 }} type={type}
      flashMode={flash}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          
          
         </View>
         <View style= {styles.continerIconosStyle}>
         <View style= {styles.iconosStyleBack}>
           <Icon
               name="camera-rear"
               type="material-community"
               size={15}
               color="white"
               iconStyle={styles.iconStyleFlash}
               onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              />

           </View>
           <View style= {styles.iconosStyle}>
           <Icon
               name="paw"
               type="material-community"
               size={15}
               color="#FF0000"
               iconStyle={styles.iconStyle}
               onPress={takePicture}
              />

           </View>
           <View style= {styles.iconosStyleFlash}>
           <Icon
               name="flash"
               type="material-community"
               size={15}
               color= {flash ? '#FEF717' : '#FFFCFC'}
               iconStyle={styles.iconStyleFlash}
               onPress={() => setFlash(flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off) }
              />
           </View>
          </View>
    </Camera>
  </View>
  );
}
  const styles = StyleSheet.create({
  
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      }, 
      containerIcon: {
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          height: 70,
          width: '100%',
          backgroundColor: '#C4C4C4'
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      }, 
      
      iconStyle: {
        fontSize: 70,
        
      },
      iconStyleFlash: {
        fontSize: 50,
        
        
      
      },
      iconosStyle:{
        width: '20%',
        height: 65,
        alignSelf: 'center',
        
        marginBottom: -50
      },
      iconosStyleFlash:{
        width: '20%',
        
        marginLeft: 280
      },
      continerIconosStyle: {
        marginBottom: 50
      },
      iconosStyleBack:{
        width: '20%',
        
        marginLeft: 40,
        marginBottom: -70
      }
  })