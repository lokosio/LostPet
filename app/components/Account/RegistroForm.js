import React, {useState} from 'react';
import{StyleSheet, View, ToastAndroid} from 'react-native'
import {Input,Icon,Button} from 'react-native-elements'
import { validateEmail} from '../../Utils/Validation'
import * as firebase from 'firebase';
import {withNavigation} from 'react-navigation';
import Loading from '../../components/Loading';



function RegistroForm(props){
    
    const {toastRef} = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading]= useState(false);
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const register = async () => {
        setIsVisibleLoading(true);
        if(!email || !password || !repeatPassword){
            ToastAndroid.show('todos los campos son obligatorios', ToastAndroid.SHORT);
        }else{
           if(!validateEmail(email)){
            ToastAndroid.show('email no es correcto', ToastAndroid.SHORT);
           }else{
            if(password !== repeatPassword){
                ToastAndroid.show('las contraseñas no coinciden', ToastAndroid.SHORT);
            }else{
                await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.navigate('MyAccount');
                })
                .catch(() => {
                    ToastAndroid.show('error al crear la cuenta', ToastAndroid.SHORT);
                })
            }
           }
        }
          
        setIsVisibleLoading(false);
    };
     
    
    return(
    <View style={styles.formContainer}>
        <Input 
       placeholder="Nombre"
       containerStyle={styles.inputForm}
       onChange={e => setName(e.nativeEvent.text)}
       rightIcon={
           <Icon
           type='material-community'
           name='at'
           iconStyle={styles.iconRight}
           />
       }
       />
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
       <Input 
       placeholder="Repetir contraseña"
       password={true}
       secureTextEntry={hideRepeatPassword}
       containerStyle={styles.inputForm}
       onChange={e => setRepeatPassword(e.nativeEvent.text)}
       rightIcon={
        <Icon
        type='material-community'
        name={hideRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
        iconStyle={styles.iconRight}
        onPress={()  => setHideRepeatPassword(!hideRepeatPassword)}
        />
    }
       />
       <Button
       title='unirse'
       containerStyle={styles.btnContainerRegistro}
       buttonStyle= {styles.btnRegistro}
       onPress={register}      
      />
      <Loading isVisible={isVisibleLoading} text='creando cuenta'/>
      
    </View>
)
}
export default withNavigation(RegistroForm);
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