import React, {useState, useEffect} from 'react';
import {Text, View,Switch,ScrollView,RefreshControl, StyleSheet} from 'react-native';
import { firebaseApp } from '../../Utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading'
import ListMascotas from './MyReportPer'
import ListMascotasEn from './MyReportEn'
import Funciones from '../funciones'
const db = firebase.firestore(firebaseApp);
function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
export default function Mascotas(props){

    const {navigation} = props;
    const [interruptor, setInterruptor] = useState(false);
    const [isReloadMascota, setIsRealoadMascota] = useState(false);
    const toggleSwitch1 = (value) => {
        setInterruptor(value)
        console.log(value)
     }
     const onRefresh = React.useCallback(() => {
        setIsRealoadMascota(true);
    
        wait(2000).then(() => setIsRealoadMascota(false));
      }, [isReloadMascota]);

     
    if(interruptor){
        return(
            <ScrollView refreshControl={
                <RefreshControl refreshing={isReloadMascota} onRefresh={onRefresh}  />
              }>
                <View style={{marginBottom:10, marginTop:10}}>
                  <Text style={styles.textoEn}>Encontradas</Text>
                <Switch onValueChange = {toggleSwitch1}
                  value = {interruptor}
                  thumbColor= '#f4511e'
                  trackColor={{ true: '#FFD8B9'}}
                  style={{alignSelf: 'center', marginTop:-25}}/>
               </View>
             <ListMascotasEn navigation={navigation} setInterruptor={setInterruptor} isReloadMascota={isReloadMascota} setIsRealoadMascota={setIsRealoadMascota}/>
            

            </ScrollView>
            
            
        )
      
    }else{
        return(
            <ScrollView refreshControl={
                <RefreshControl refreshing={isReloadMascota} onRefresh={onRefresh} />
              }>
                <View style={{marginBottom:10, marginTop:10}}>
                <Text style={styles.textoPer}> Perdidas</Text>
                <Switch onValueChange = {toggleSwitch1}
                  value = {interruptor}
                  thumbColor= '#00a680'
                  trackColor={{ false: '#9DCABF'}}
                  style={{alignSelf: 'center', marginTop:-25}}/>
              </View>
             <ListMascotas navigation={navigation} setInterruptor={setInterruptor} isReloadMascota={isReloadMascota} setIsRealoadMascota={setIsRealoadMascota}/>
            

            </ScrollView>
            
        )
       
    }
    
}

const styles = StyleSheet.create({
  textoPer: {
    alignSelf: 'flex-start',
    color: '#00a680',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 30
    },
    textoEn: {
      alignSelf: 'flex-end',
      color: '#f4511e',
      fontSize: 20,
      marginTop: 10,
      marginLeft: 30
      }

});