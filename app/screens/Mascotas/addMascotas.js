import React, { useState } from 'react'
import {Text, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddMascotasForm from '../../components/Mascotas/addMascotasForm'
import Loading from '../../components/Loading'
import { colors } from 'react-native-elements'

export default function addMascotas(props){
  
    const {navigation} = props;
    const {setIsRealoadMascota} = navigation.state.params;
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <KeyboardAwareScrollView>

        <View>
        <AddMascotasForm setIsLoading={setIsLoading} navigation={navigation} setIsRealoadMascota={setIsRealoadMascota}/>
        <Loading isVisible={isLoading} text='creando Mascota'/>           
        </View>
      </KeyboardAwareScrollView>
    )
}