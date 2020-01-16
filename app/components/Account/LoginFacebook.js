import React,{useState} from 'react'
import{ToastAndroid} from 'react-native'

import {SocialIcon} from 'react-native-elements'
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase'
import {FacebookApi} from '../../Utils/social'
import Loading from '../../components/Loading'
import {withNavigation} from 'react-navigation';

 function LoginFacebook(props){
    const {navigation} = props;

    const [isVisibleLoading, setIsVisibleLoading]= useState(false);

    const login = async () => {
        setIsVisibleLoading(true);

        await Facebook.initializeAsync('374616303402537');
       const {type, token}= await Facebook.logInWithReadPermissionsAsync(
          FacebookApi.application_id,
          {permissions: FacebookApi.permissions}
       );
       if(type === 'success'){
           const credentials = firebase.auth.FacebookAuthProvider.credential(token);
           await firebase
           .auth()
           .signInWithCredential(credentials)
           .then(() => {
            navigation.navigate('MyAccount');
           })
           .catch(() => {
            ToastAndroid.show('error accediendo a facebook', ToastAndroid.SHORT);

           });
       }else if(type === 'cancel'){
        ToastAndroid.show('inicio de sesion cancelado', ToastAndroid.SHORT);

       }else{
        ToastAndroid.show('error desconocido intentelo mas tarde', ToastAndroid.SHORT);

       }
       setIsVisibleLoading(false);

    };

    return (
        <>
        <SocialIcon
        title='iniciar sesion con facebook'
        button
        type='facebook'
        onPress={login}
        />
        <Loading isVisible={isVisibleLoading} text='iniciando sesion'/>
        </>
    )
}

export default withNavigation(LoginFacebook);