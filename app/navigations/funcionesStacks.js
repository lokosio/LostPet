import {createStackNavigator} from 'react-navigation-stack'
import funcionesScreen from '../screens/funciones.js'
import addMascotasScreen from '../screens/Mascotas/addMascotas'
import mascotasScreen from '../screens/Mascotas/Mascotas'
import addMascotaEncontradaScreen from '../screens/Mascotas/addMascotaEncontrada'
import mascotasEncontradas from '../screens/Mascotas/Encontradas'
const funcionesScreenStacks = createStackNavigator({
    funciones: {
        screen: funcionesScreen,
        navigationOptions: () => ({
            title: 'funciones del sistema'
        })
    },
    
    addMascotas: {
        screen: addMascotasScreen,
        navigationOptions: () => ({
            title: 'Agregar Mascotas'
        })
    }, 
    mascotas: {
        screen: mascotasScreen,
        navigationOptions: () => ({
            title: 'Mascotas'
        })

    },
    addMascotaEncontrada: {
        screen: addMascotaEncontradaScreen,
        navigationOptions: () => ({
            title: 'Mascotas'
        })

    },
    mascotasEncontradas: {
        screen: mascotasEncontradas,
        navigationOptions: () => ({
            title: 'Mascotas'
        })

    }
});

export default funcionesScreenStacks;