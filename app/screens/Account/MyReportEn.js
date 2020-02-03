import React, {useState, useEffect} from 'react';
import {Text, View,Switch} from 'react-native';
import { firebaseApp } from '../../Utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading'
import ListMascotas from '../../components/Account/ListMyReport'
import ListMascotasEn from '../../components/Account/ListMyReportEncontradas'
import Funciones from '../funciones'
const db = firebase.firestore(firebaseApp);

export default function Mascotas(props){
    const {navigation,setInterruptor, isReloadMascota,setIsRealoadMascota} = props;
    const [user, setUser] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [startMascotas, setStartMascotas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalMascotas, setTotalMascotas] = useState(0);
    const limitMascotas = 8;

useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
        setUser(userInfo);
    });

}, []);

useEffect(() => {
    db.collection('mascotasEncontradas')
    .get()
    .then(snap => {
        setTotalMascotas(snap.size);
        console.log(totalMascotas)
       });
       
       (async () => {
           const resultMascotas = [];
           const mascotas = db
           .collection('mascotasEncontradas')
           .orderBy('createAt', 'desc')
           .limit(limitMascotas)
                  
           await mascotas.get().then(response => {
                setStartMascotas(response.docs[response.docs.length - 1]);
                   
               response.forEach(doc => {
               
                   let pet = doc.data();
                   pet.id = doc.id;  
                  
                   if(pet.createBy === firebaseApp.auth().currentUser.uid ){
                     resultMascotas.push({pet});
                   }                      
               });
               setMascotas(resultMascotas);
            })
       })();
       setIsRealoadMascota(false);
}, [isReloadMascota]);

const handleLoadMore = async () => {
    const resultMascotas = [];
    mascotas.length < totalMascotas && setIsLoading(true);

    const mascotasDB = db
    .collection('mascotasEncontradas')
    .orderBy('createAt','desc')
    .startAfter(startMascotas.data().createAt)
    .limit(limitMascotas);

    await mascotasDB.get().then(response => {
        if(response.docs.length > 0){
            setStartMascotas(response.docs[response.docs.length - 1]);
        }else {
            setIsLoading(false);
        }

        response.forEach(doc => {
            let pet = doc.data();
            pet.id = doc.id;
            resultMascotas.push({pet}) 
        });
        setMascotas([...mascotas, ...resultMascotas]);
    });
};




return (
    <View>
       
       <ListMascotasEn
       mascotas={mascotas}
       isLoading={isLoading}
       handleLoadMore={handleLoadMore}
       navigation={navigation}/>
    </View>
)
}