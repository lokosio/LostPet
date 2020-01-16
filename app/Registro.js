import React, { Component, useRef } from 'react';
import {StyleSheet, View,Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegistroForm from '../app/components/Account/RegistroForm'
export default function Registro() {
   
    return( 
      <KeyboardAwareScrollView>

        <View>
          <RegistroForm />
          
        </View>
      </KeyboardAwareScrollView>
    
     

    );
  
}

