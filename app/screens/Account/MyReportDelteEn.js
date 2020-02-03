import React, {useState, useEffect} from 'react';
import {StyleSheet,ScrollView ,View, Text, Dimensions} from 'react-native';
import {Icon, ListItem,Button} from 'react-native-elements'
import Carousel from '../../components/carousel'
import * as firebase from 'firebase';
import {firebaseApp} from '../../Utils/FireBase'
import {ToastAndroid} from 'react-native';
import 'firebase/firestore';
import Map from '../../components/Map'
const screenWidth = Dimensions.get('window').width;
const db = firebase.firestore(firebaseApp);
export default function Mascota(props){
    const {navigation} = props;
    const {pet} = navigation.state.params.pet.item;
    const [imageMascota, setImageMascota] = useState([]);
   

    const updateEstado = () => {
        const mascotaRef = db.collection('mascotasEncontradas').doc(pet.id);

        mascotaRef.get().then(response => {
            const mascotaData = response.data();
            const estadoMascota = false;

            mascotaRef.update({estado: estadoMascota}).then(() => {
                ToastAndroid.show('Reporte eliminado!', ToastAndroid.SHORT);
                navigation.navigate('Search')
            })
        })
    }

    

    useEffect(() => {
        const arrayUrls = [];
        (async () => {
            await Promise.all(pet.images.map(async idImage => {
              await firebase.storage().ref(`mascotas-imagenes-encontradas/${idImage}`)
              .getDownloadURL()
              .then(imageUrl => {
                  arrayUrls.push(imageUrl)
              });
            }));            
            setImageMascota(arrayUrls);            
        })();
        
    },[]);
    return(
        <ScrollView style={StyleSheet.viewBody}>
            <Carousel
              arrayImages={imageMascota}
              width={screenWidth}
              height={250}
            />
            <TitleMascota 
              
               description={pet.description}
            />
            <MascotaInfo
               location={pet.location}
               
               phone={pet.phone}
               
            />
            {pet.estado && <Button
           title='Eliminar Reporte'
           onPress={updateEstado}
           buttonStyle={styles.btnAddMascotas}
           />}
            
      
        </ScrollView>
            
            
        
    )
}



function TitleMascota(props){
    const {description} = props;


    return(
        <View style={styles.viewMascotaTitle}>
           
           <Text style={styles.descriptionMascota}>{description}</Text>
        </View>
    )

}

function MascotaInfo(props){
    const {location, phone  } = props;

    const listInfo = [
        
        {
            text: phone,
            iconName: 'phone',
            iconType: 'material-community',
            action: null
        },
        

    ]

    return(
        <View style={styles.viewPetInfo}>
            <Text style={styles.petInfoTitle}>Informacion sobre la mascota</Text>
            <Map location={location}  height={100}/>
           
           {listInfo.map((item, index) => (
               
                <ListItem
                   key={index}
                   title={item.text}
                   leftIcon={{
                       name: item.iconName,
                       type: item.iconType,
                       color: '#00a680'
                   }}
                   containerStyle={styles.containerListItem}
                />
           ))}
            

        
            
        </View>
    )
}
const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewMascotaTitle: {
        margin: 15,
        alignItems: 'center'
    },
    nameMascota: {
        fontSize: 20,
        fontWeight: 'bold',
       
    },
    viewName: {
        alignItems: 'center',
        margin: 10
    },
    descriptionMascota: {
        color: 'grey'
    },
    viewPetInfo: {
        margin: 15,
        marginTop: 25
    },
    petInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1
    },
    btnAddMascotas: {
        backgroundColor: '#00a680',
        margin: 20
       }
   
})