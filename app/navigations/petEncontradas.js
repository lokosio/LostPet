import {createStackNavigator} from 'react-navigation-stack'
import EncontradasScreen from '../screens/Mascotas/Encontradas'

 const encontradasScreenStacks = createStackNavigator({
    Search: {
        screen: EncontradasScreen,
        navigationOptions: () => ({
            title: 'Mascotas Encontradas'
        })
    }
});

export default encontradasScreenStacks;