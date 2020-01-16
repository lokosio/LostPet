import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight, Alert,Button} from 'react-native';
import LoginForm from '../app/components/Account/LoginForm';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginFacebook from './components/Account/LoginFacebook'

export default function Login(props) {
 const {navigation} = props;
  
    return( 

      <KeyboardAwareScrollView>

        <View>
        <LoginForm/>
        <LoginFacebook/> 
        <CreateAccount navigation={navigation}/>
           
        </View>
      </KeyboardAwareScrollView>
      
    
      

    );
  
}

function CreateAccount(props){
  const {navigation} = props;
  return(
    <View style={styles.formContainer}>
    <Text>
      ¿Aún no tienes cuenta?{' '}
      <Text
      style={styles.btnRegister}
      onPress={() => navigation.navigate('Register')}>
      Regitrarse 
    </Text>
    </Text>
    
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
  },
  btnRegister: {
    color: '#00a680',
    fontWeight: 'bold'
  }
  
})
