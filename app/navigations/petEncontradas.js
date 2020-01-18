import {createStackNavigator} from 'react-navigation-stack'
import EncontradasScreen from '../screens/Mascotas/Encontradas'
import addMascotaEncontradaScreen from '../screens/Mascotas/addMascotaEncontrada'

 const encontradasScreenStacks = createStackNavigator({
    Search: {
        screen: EncontradasScreen,
        navigationOptions: () => ({
            title: 'Mascotas Encontradas'
        })
    },
    addMascotaEncontrada: {
        screen: addMascotaEncontradaScreen,
        navigationOptions: () => ({
            title: 'Notificar Mascota Encontrada'
        })

    }
    
    
});

export default encontradasScreenStacks;