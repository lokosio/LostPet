import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
export default function InfoUser(props){
    const {
        userInfo: {uid, displayName, email, photoURL}
    } =props;

   /* const changeAvatar = async () => {
        const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermisionCamera = resultPermision.permissions.cameraRoll.status;

        if(resultPermisionCamera === 'denied'){
            console.log('es necesario aceptar los permisos');
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled){
                console.log('has creado la galeria de imagenes.');
            }else{
                uploadImage(result.uri, uid).then(() => {
                    console.log('image subida corectamente')
                })
            }
        }
    };

    const uploadImage = async (uri, nameImage) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase
        .storage()
        .ref()
        .child(`avatar/${nameImage}`);
        return ref.put(blob);

    };*/
    return(
        <View style={styles.viewUserInfo}>
            <Avatar
            rounded
            size='large'
            showEditButton
            
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
        <Text>{email ? email : 'Social Red'}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold'
    }
});