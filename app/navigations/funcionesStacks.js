import {createStackNavigator} from 'react-navigation-stack'
import funcionesScreen from '../screens/funciones.js'

import mascotasScreen from '../screens/Mascotas/Mascotas'



const funcionesScreenStacks = createStackNavigator({
    funciones: {
        screen: funcionesScreen,
        navigationOptions: () => ({
            title: 'funciones del sistema'
        })
    }
   
    
});

export default funcionesScreenStacks;