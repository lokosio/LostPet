import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from '../../Utils/FireBase'
import firebase from 'firebase/app';
import 'firebase/firestore';
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePassword from './ChangePasswaordForm'
export default function AccountOptions(props){
    
    
    const {navigation} = props;
    const [isVisibleModal, setIsvisibleModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const menuOptions = [{
        title: 'cambiar Nombre y Apellidos',
        iconType: 'material-community',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#FC8600',
        iconNameRight: 'chevron-right',
        iconColorRight: '#00a680',
        onPress: () => selectedComponent('displayName')
    },
    {
        title: 'cambiar Email',
        iconType: 'material-community',
        iconNameLeft: 'at',
        iconColorLeft: '#FC8600',
        iconNameRight: 'chevron-right',
        iconColorRight: '#00a680',
        onPress: () => selectedComponent('email')
    },
    {
        title: 'cambiar contraseña',
        iconType: 'material-community',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#FC8600',
        iconNameRight: 'chevron-right',
        iconColorRight: '#00a680',
        onPress: () => selectedComponent('password')
    },
    
    {
        title: 'Ver mis reportes',
        iconType: 'material-community',
        iconNameLeft: 'cat',
        iconColorLeft: '#FC8600',
        iconNameRight: 'chevron-right',
        iconColorRight: '#00a680',
        onPress: () => navigation.navigate('MisReportess')  
    }
];

const selectedComponent = (key) =>{
    switch(key){
        case 'displayName': 
        setRenderComponent(<ChangeDisplayNameForm/>)
        setIsvisibleModal(true)
          break;
        case 'email': 
        setRenderComponent(<ChangeEmailForm/>)
        setIsvisibleModal(true)
        break;
        case 'password':
        setRenderComponent(<ChangePassword/>)
        setIsvisibleModal(true)
        break;
        default: 
          break;
    }
}
    return(
        <View>
            {menuOptions.map((menu, index) => (
                <ListItem
                  key={index}
                  title={menu.title}
                  leftIcon={{
                      type: menu.iconType,
                      name: menu.iconNameLeft,
                      color: menu.iconColorLeft
                  }}
                  rightIcon={{
                    type: menu.iconType,
                    name: menu.iconNameRight,
                    color: menu.iconColorRight
                  }}
                  onPress={menu.onPress}
                  containerStyle={styles.menuItem}
                />
    ))}
    {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsvisibleModal}>
        {renderComponent}
    </Modal>

    )}
    
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})