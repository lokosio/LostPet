
import React, { useState } from 'react'
import {Text, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddMascotasFormN from '../../components/Mascotas/addMascotasFormN'
import Loading from '../../components/Loading'

export default function addMascotas(props){
    const {navigation} = props;
    const {setIsRealoadMascota, imageSnap} = navigation.state.params;
    console.log(imageSnap)
    const [isLoading, setIsLoading] = useState(false);
    return (
        <KeyboardAwareScrollView>

        <View>
        <AddMascotasFormN imageSnap={imageSnap} setIsLoading={setIsLoading} navigation={navigation} setIsRealoadMascota={setIsRealoadMascota}/>
        <Loading isVisible={isLoading} text='creando Mascota'/>           
        </View>
      </KeyboardAwareScrollView>
    )
}