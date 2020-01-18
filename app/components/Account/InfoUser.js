import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
        backgroundColor: '#B9CBA7',
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