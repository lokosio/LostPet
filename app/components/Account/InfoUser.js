import React from 'react';
import{ToastAndroid} from 'react-native'

import {View, Text, StyleSheet,ImageBackground} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {firebaseApp} from '../../Utils/FireBase'
/*import firebase from 'firebase/app';
import 'firebase/firestore';*/
export default function InfoUser(props){
    const {
        userInfo: {uid, displayName, email, photoURL},
        setReloadData, setTextLoading, setIsLoading
    } =props;

    const changeAvatar = async () =>{
        const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermisionCamera = resultPermision.permissions.cameraRoll.status;
        
        if(resultPermisionCamera === 'denied'){
            ToastAndroid.show('es necesario aceptar los permisos', ToastAndroid.SHORT);

        }else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            if(result.cancelled){
                ToastAndroid.show('has cerrado la galeria sin seleccionar una foto', ToastAndroid.SHORT);

            }else{
                uploadImage(result.uri, uid).then(() => {
                    ToastAndroid.show('foto actualizada', ToastAndroid.SHORT);
                    updatePhotoUrl(uid);
                })
            }
        }
    };

    const uploadImage = async (uri, nameImage ) => {
        setTextLoading('ACTUALIZANDO AVATAR');
        setIsLoading(true);
        const response = await fetch(uri) ;
        const blob = await response.blob();
        
        const ref = firebase
        .storage()
        .ref()
        .child(`avatar/${nameImage}`);
        return ref.put(blob)
    };

    const updatePhotoUrl = uid => {
      firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
          const update = {
              photoURL: result
          }
          await firebase.auth().currentUser.updateProfile(update);
          setReloadData(true);
          setIsLoading(false);
      }).catch(() => {
          console.log('error al recuperar el avatar')
      })
    }
   
    return(

        
        <ImageBackground source={require('../../../assets/img/fondo.jpg')} style={{width: '100%'}}>
        <View style={styles.viewUserInfo}>
            
            <Avatar
            rounded
            size='large'
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
                uri: photoURL 
                ? photoURL
                : 'https://api.adorable.io/avatars/165/abott@adorable.png'
            }}/>
            <View>
                <Text style={styles.displayName}>
                  {displayName ? displayName : 'Anonimo'}
                </Text>
                <Text style={{color: '#fff'}}>{email ? email : 'Social Red'}</Text>
                 
            </View>
            
            
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    displayName: {
        fontWeight: 'bold',
        color: '#fff'
    }
});