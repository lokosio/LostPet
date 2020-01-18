
import React, { useState } from 'react'
import {Text, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddMascotasFormN from '../../components/Mascotas/addMascotasFormN'
import Loading from '../../components/Loading'

export default function addMascotas(props){
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    return (
        <KeyboardAwareScrollView>

        <View>
        <AddMascotasFormN setIsLoading={setIsLoading} navigation={navigation}/>
        <Loading isVisible={isLoading} text='creando Mascota'/>           
        </View>
      </KeyboardAwareScrollView>
    )
}