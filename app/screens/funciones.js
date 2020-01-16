import React,{useState, useEffect} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import {Button} from 'react-native-elements'
import {withNavigation, NavigationEvents} from 'react-navigation';
import * as firebase from 'firebase';

 function funciones(props){
    
    const { navigation }= props;
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    return (
        <View style={styles.formContainer}> 
        
        {user && <Button
       title='Reportar mi mascota perdida'
       containerStyle={styles.btnContainerRegistro}
       buttonStyle= {styles.btnRegistro}
       onPress={() => navigation.navigate("addMascotas")}      
        />}
        {user && <Button
       title='notificar mascota encontrada'
       containerStyle={styles.btnContainerRegistro}
       buttonStyle= {styles.btnRegistro}
       onPress={() => navigation.navigate("addMascotaEncontrada")}      
        />}

        
      </View>
    )
}
export default withNavigation(funciones);
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputForm:{
        width: '100%',
        marginTop: 20,
    },
    iconRight: {
        color: '#c1c1c1'
    },
    btnContainerRegistro: {
        marginTop: 20,
        width: '95%'
    },
    btnRegistro:{
        backgroundColor: '#006a80'
    }
    
})