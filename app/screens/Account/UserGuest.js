import React, {Component} from 'react';
import {View, Text,  StyleSheet,Styles,Image} from'react-native';
import {Button} from 'react-native-elements'
import {withNavigation} from 'react-navigation';
function UserGuest(props){
const { navigation }= props;
  
    return (
      <View style={styles.formContainer}>
       <Image
            source= {require('../../../assets/img/logo.jpeg')}
            style={styles.image}
            
            resizeMode='contain'
          />
       
       <Button
       title='iniciar sesion'
       containerStyle={styles.btnContainerRegistro}
       buttonStyle= {styles.btnRegistro}
       onPress={() => navigation.navigate("Login")}      
      />
    </View>

      
  )
}

export default withNavigation(UserGuest)

const styles = StyleSheet.create({
  formContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
  },
  image: {
   marginTop: -150,
   width: 550
  },
  btnContainerRegistro: {
      marginBottom: 200,
      marginTop: -200,
      width: '95%'
  },
  btnRegistro:{
      backgroundColor: '#006a80'
  }
  
})
