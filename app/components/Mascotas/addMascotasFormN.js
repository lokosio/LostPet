import React, { useState, useEffect} from 'react'
import {Text, StyleSheet, View, ScrollView, Alert, Dimensions, ToastAndroid} from 'react-native'
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import Modal from '../Modal';
import uuid from 'uuid/v4';
import {firebaseApp} from '../../Utils/FireBase'
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get('window').width;

export default function addMascotasForm(props){

    const [imagesSelected, setImagesSelected] = useState([]);
    const{ navigation, setIsLoading} =props;
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [LocationMascotas,setLocationMascotas] = useState(null);
    const [mascotasDescription, setMascotastDescription] = useState('Encontre esta mascota aqui esta la direccion donde fue vista');
    
    const addMascotas = () => {
        if(imagesSelected.length === 0){
           ToastAndroid.show('seleccione almenos una imagen', ToastAndroid.SHORT);
        }else if(!LocationMascotas){
            ToastAndroid.show('tienes que poner la ubicacion', ToastAndroid.SHORT);

        }else {
            setIsLoading(true);
            
            uploadImagesStorage(imagesSelected).then(arrayImages => {
                db.collection('mascotasEncontradas')
                .add({
                    description: mascotasDescription,
                    location: LocationMascotas,
                    images: arrayImages,
                    createAt: new Date(),
                    createBy: firebaseApp.auth().currentUser.uid
                })
                .then(() => {
                    setIsLoading(false);
                    console.log(navigation.navigate)
                    navigation.navigate('mascotasEncontradas');
                })
                .catch(() => {
                    setIsLoading(false);
                    ToastAndroid.show('Error al subir el reporte, intente mas tarde', ToastAndroid.SHORT);

                });
            });
        }
    };

    const uploadImagesStorage = async ImageArray => {
        const imagesBlob = [];
        await Promise.all(
            ImageArray.map( async image => {
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase
                .storage()
                .ref('mascotas-imagenes-encontradas')
                .child(uuid());
                await ref.put(blob).then(result => {
                    imagesBlob.push(result.metadata.name);
                });
            })
        );
        return imagesBlob;
    }
    return (
        <ScrollView>
           <ImageMascotas imageMascotas={imagesSelected[0]}/>
           <FormAdd
                
           setIsVisibleMap={setIsVisibleMap}
           LocationMascotas={LocationMascotas}/>
           
           <UploadImagen imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} style={styles.imagenStyle}/>

           <Button
           title='notificar mascota'
           onPress={addMascotas}
           buttonStyle={styles.btnAddMascotas}/>
           <Maps
           isVisibleMap={isVisibleMap}
           setIsVisibleMap={setIsVisibleMap}
           setLocationMascotas={setLocationMascotas}/>
        </ScrollView>
    );
}

function ImageMascotas(props){
    const {imageMascotas} = props;
    return(
        <View style={styles.viewPhoto}>
             {imageMascotas ? (
                 <Image
                   source={{uri: imageMascotas}}
                   style={{width:widthScreen, height: 200}}
                 />
             ) : (
                <Image
                   source={ require('../../../assets/img/no-image.png')}
                   style={{ width: widthScreen, height: 200}} 
                />

             )}
        </View>
    )
}

function UploadImagen(props){
    const {imagesSelected, setImagesSelected} = props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if(resultPermissionCamera === 'denied'){
            ToastAndroid.show('es necesario dar permisos', ToastAndroid.SHORT);
      }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (result.cancelled){
            ToastAndroid.show('has cerrado la galeria sin seleccionar ninguna imagen', ToastAndroid.SHORT);
        }else{
            setImagesSelected([...imagesSelected, result.uri]);
        }

      }
         
    };
    
    const removeImage = image => {
        const arrayImages = imagesSelected;

        Alert.alert(
            'Eliminar Imagen',
            '¿Estas seguro de eliminar la imagen?',
            [
                {
                    text: 'cancel',
                    style: 'cancel'
                },
                {
                    text: 'eliminar',
                    onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))
                }
            ],
            {cancelable: false}
        )

    };

    return(
       <View >
           <View style={styles.viewImages}>
           {imagesSelected.length < 4 && (
               <Icon
               type='material-community'
               name='camera'
               color='#FFFCFC'
               containerStyle={styles.containerIcon}
               onPress={imageSelect}
             />
           )}
           </View>
           
           <View style={styles.viewImages}>
           {imagesSelected.map(imageMascotas => (
               <Avatar
               key={imageMascotas}
               onPress={() => removeImage(imageMascotas)}
               style={styles.miniatureStyle}
               source= {{uri: imageMascotas}}
               />
               

           ) )}
           </View>
           
           

       </View>
    )
}

function FormAdd(props){

    const {
        setIsVisibleMap,
        LocationMascotas
    } = props
    return(
        <View style={styles.viewForm}>
        <Text style={styles.textS}>Seleccione ubicacion</Text>
        <View style={styles.iconSyle}>
        <Icon 
            name='google-maps'
            type='material-community'
            color= {LocationMascotas ? '#00a680' : '#FFFCFC'}
            onPress={() => setIsVisibleMap(true)}
        />
        </View>
        
        <Text style={styles.textS}>Seleccione Imagen</Text>         
        </View>
    )
}

function Maps(props){
    const{
        isVisibleMap,
        setIsVisibleMap,
        setLocationMascotas,
}= props;
const [location, setLocation] = useState(null);

useEffect(() => {
    (async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;

        if(statusPermissions !== 'granted'){
            ToastAndroid.show('conceder permisos', ToastAndroid.SHORT);

        }else{
            const loc = await Location.getCurrentPositionAsync({});
            
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            });

        }
    })();
}, []);

const confirmLocation = () => {
    setLocationMascotas(location);
    ToastAndroid.show('Localizacion guardada correctamente', ToastAndroid.SHORT);

    setIsVisibleMap(false);
}

return(
   
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
       <View>
            {location && (
                <MapView style={styles.mapStyle}
                initialRegion={location}
                showsUserLocation={true}
                onRegionChange={region => setLocation(region)}
                >
                    <MapView.Marker 
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                    draggable
                    />

                </MapView>
            )}

            <View style={styles.viewMapBtn}>
               <Button
                  title='guardar ubicacion'
                  onPress={confirmLocation}
                  containerStyle={styles.viewMapBtnContainerSave} 
                  buttonStyle={styles.viewMapBtnSave}            
               />
               <Button
                  title='cancelar ubicacion'
                  onPress={() => setIsVisibleMap(false)}
                  containerStyle={styles.viewMapBtnContainerCancel} 
                  buttonStyle={styles.viewMapBtnCancel}           
               />
            </View>
        </View>
    </Modal>

)
}
const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
   viewImages: {
       flexDirection: 'row',
       marginLeft: 20,
       marginRight: 20,
       marginTop: 30
   }, 
   containerIcon: {
       alignItems: 'center',
       justifyContent: 'center',
       marginRight: 10,
       height: 70,
       width: '100%',
       backgroundColor: '#C4C4C4'
   },
   miniatureStyle: {
       width: 70,
       height: 70,
       marginRight: 10,
       
   },
   viewForm: {
       marginLeft: 10,
       marginRight: 10,
       alignItems: 'center'
   },
   textArea: {
       height: 100,
       width: '100%',
       padding: 0,
       margin: 0
   },
   mapStyle: {
       width: '100%',
       height: '90%'
   },
   viewMapBtn: {
       flexDirection: 'row',
       justifyContent: 'center',
       marginTop: 10
   },
   viewMapBtnContainerSave: {
       paddingRight: 5
   },
   viewMapBtnSave: {
       backgroundColor: '#00a680'
   },
   viewMapBtnContainerCancel: {
       paddingLeft: 5
   },
   viewMapBtnCancel: {
    backgroundColor: '#a60d0d'

   },
   btnAddMascotas: {
    backgroundColor: '#00a680',
    margin: 20
   },
   textS: {
       fontSize: 20,
       
   },
   iconSyle: {
     margin: 20,
     backgroundColor: '#C4C4C4',
     width: '95%',
     height: 60,
     justifyContent: 'center',
     

   },
   imagenStyle:{
       backgroundColor: 'red'
   }
   
});

