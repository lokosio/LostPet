import React from 'react';
import {Icon} from 'react-native-elements'
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import mascotasScreenStacks from './LostpetStack';
//import funcionesScreenStacks from './funcionesStacks.js'
import MyAccountScreenStack from './MyAccountStack.js'
import SearchScreenStack from './SearchStacks.js'
import petEncontradasScreenStack from './petEncontradas.js'

const NavigationStacks = createBottomTabNavigator({
   
  Mascotas: {
       screen: mascotasScreenStacks,
       navigationOptions: () => ({
           tabBarLabel: 'Perdidas',
           tabBarIcon: ({ tintColor}) => (
               <Icon
                 type='material-community'
                 name='paw'
                 size={22}
                 color={tintColor}               
               />
           )
       })
   },
   
   MyAccount: {
    screen: MyAccountScreenStack,
    navigationOptions: () => ({
      tabBarLabel: 'Mi Cuenta',
      
      tabBarIcon: ({ tintColor}) => (
       <Icon
         type='material-community'
         name='home-outline'
         size={22}
         color={tintColor}               
       />
   )
    })
  },
  Encontradas: {
    screen: petEncontradasScreenStack,
    navigationOptions: () => ({
      tabBarLabel: 'Encontradas',
      tabBarIcon: ({ tintColor}) => (
          <Icon
            type='material-community'
            name='paw'
            size={22}
            color={tintColor}               
          />
      )
  })
  }
   
 },
 {
   initialRouteName: 'MyAccount',
   order: ['Mascotas','Encontradas','MyAccount'],
   tabBarOptions: {
     inactiveTintColor: '#646464',
     activeTintColor: '#f4511e',
     
   }
 }
 );

 export default createAppContainer(NavigationStacks);