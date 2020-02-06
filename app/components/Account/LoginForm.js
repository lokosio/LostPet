import React, {useState} from 'react';
import{StyleSheet, View,ToastAndroid} from 'react-native'
import {Input,Icon,Button} from 'react-native-elements'
import { validateEmail} from '../../Utils/Validation.js'
import * as firebase from 'firebase';
import {withNavigation} from 'react-navigation';
import Loading from '../../components/Loading'

 function LoginForm(props){
     const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisibleLoading, setIsVisibleLoading]= useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const login = async () => {
        setIsVisibleLoading(true);

        if(!email || !password){
            ToastAndroid.show('todos los campos son obligatorios', ToastAndroid.SHORT);
         }else{
            if(!validateEmail(email)){
                ToastAndroid.show('email no es correcto', ToastAndroid.SHORT);
               }else{
                await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {navigation.navigate('MyAccount');
                ToastAndroid.show('Bienvenido a LostPet', ToastAndroid.SHORT);
                }
                
            
                )
                .catch(() => {
                    ToastAndroid.show('error al logear', ToastAndroid.SHORT);
                }
                )
               }
         }
         setIsVisibleLoading(false);

    };
    return(
    <View style={styles.formContainer}>
       <Input 
       placeholder="correo electronico"
       containerStyle={styles.inputForm}
       onChange={e => setEmail(e.nativeEvent.text)}
       rightIcon={
           <Icon
           type='material-community'
           name='at'
           iconStyle={styles.iconRight}
           />
       }
       />
       <Input 
       placeholder="contraseña"
       password={true}
       secureTextEntry={hidePassword}
       containerStyle={styles.inputForm}
       onChange={e => setPassword(e.nativeEvent.text)}
       rightIcon={
        <Icon
        type='material-community'
        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
        iconStyle={styles.iconRight}
        onPress={()  => setHidePassword(!hidePassword)}
        />
    }
       />
       
       <Button
       title='iniciar sesion'
       containerStyle={styles.btnContainerRegistro}
       buttonStyle= {styles.btnRegistro}
       onPress={login}      
      />
            <Loading isVisible={isVisibleLoading} text='cargando cuenta'/>

    </View>
)
}
export default withNavigation(LoginForm);
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