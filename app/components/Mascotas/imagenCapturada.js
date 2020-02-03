import React from 'react'
import { View,Text } from 'react-native'
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements';
export default function imagenCapturada(props){
    const {navigation} = props;
    const {imageSnap} = navigation.state.params;
    console.log('hola3',imageSnap);
    return(
        <View>
            {console.log('hola4',imageSnap)}
            {imageSnap.map(imageMascotas => (
               console.log('entro'),
               <Avatar
               key={imageMascotas}
               onPress={() => removeImage(imageMascotas)}
               style={styles.miniatureStyle}
               source= {{uri: imageMascotas}}
               />

           ) )}
        </View>
    )
}