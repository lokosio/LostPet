import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';
import * as firebase from 'firebase';
import {firebaseApp} from '../../Utils/FireBase';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading'
export default function App() {
  
  const [login, setLogin] = useState(null);
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        !user ? setLogin(false) : setLogin(true);
      });
    }, []);

    if(login === null){
        return (
            <Loading isVisible={true} text='cargando...'/>
        );
    }

    

    return login ? <UserLogged /> : <UserGuest/>;
}