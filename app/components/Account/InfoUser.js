import React from 'react';
import {View, Text, StyleSheet,ImageBackground} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {firebaseApp} from '../../Utils/FireBase'
import firebase from 'firebase/app';
import 'firebase/firestore';
export default function InfoUser(props){
    const {
        userInfo: {uid, displayName, email, photoURL}
    } =props;
   
    return(

        
        <ImageBackground source={require('../../../assets/img/fondo.jpg')} style={{width: '100%'}}>
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