import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet,button, Button,ImageBackground,ScrollView,RefreshControl,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { firebaseApp } from '../../Utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading'
import ListMascotas from '../../components/Mascotas/ListMascotas'
import Funciones from '../funciones'
const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').height;

export default function Mascotas(props){

    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [startMascotas, setStartMascotas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalMascotas, setTotalMascotas] = useState(0);
    const [isReloadMascota, setIsRealoadMascota] = useState(false);
    const limitMascotas = 8;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });

    }, []);

    useEffect(() => {
        db.collection('mascotasPerdidas')
        .get()
        .then(snap => {
            setTotalMascotas(snap.size);
            });

        (async () => {
               const resultMascotas = [];
               const mascotas = db
               .collection('mascotasPerdidas')
               .orderBy('createAt', 'desc')
               .limit(limitMascotas)
                await mascotas.get().then(response => {
                 setStartMascotas(response.docs[response.docs.length - 1]);
                       response.forEach(doc => {
                            let pet = doc.data();
                            pet.id = doc.id;
                            
                            if(pet.estado == true){
                            resultMascotas.push({pet});
                            }                  
                    });
                   setMascotas(resultMascotas);
               })
           })();
           console.log('1--'+isReloadMascota+'--1')
           setIsRealoadMascota(false);
           setIsLoading(false)
           console.log('2--'+isReloadMascota+'--2')
          
    }, [isReloadMascota]);

    const handleLoadMore = async () => {
        const resultMascotas = [];
        console.log('6--'+mascotas.length+'--6'+ totalMascotas)
        mascotas.length < totalMascotas && setIsLoading(true);

        const mascotasDB = db
        .collection('mascotasPerdidas')
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
      <View  style={styles.container}>
      
           {user && <ListMascotas
           mascotas={mascotas}
           isLoading={isLoading}
           handleLoadMore={handleLoadMore}
           navigation={navigation}
           setIsRealoadMascota={setIsRealoadMascota}
           isReloadMascota={isReloadMascota}
           setIsLoading={setIsLoading}
           
           /> 
           }
           {user && <AcctionButton mascotas={mascotas} navigation={navigation} setIsRealoadMascota={setIsRealoadMascota} setIsLoading={setIsLoading}/>}
           
           {!user && <Text>debe iniciar sesion</Text>}
           
        </View>
        

      
       
        
    )
}

function AcctionButton(props){
    const {navigation, setIsRealoadMascota,setIsLoading, mascotas} = props;
    return (
        <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Reportar mi mascota perdida"
          onPress={() => navigation.navigate("addMascotas",{setIsRealoadMascota})}>
          <Icon name="paw" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Mapa"
          onPress={() => navigation.navigate("Mapa",{mascotas})}>
          <Icon name="map-marker" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        
             
        </ActionButton>
        
        
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F1F1'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });