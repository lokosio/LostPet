import {createStackNavigator} from 'react-navigation-stack'
import mascotasScreen from '../screens/Mascotas'
import mascotaScreen from '../screens/Mascotas/mascota'
 const RestaurantsScreenStacks = createStackNavigator({
    Mascotas: {
        screen: mascotasScreen,
        navigationOptions: () => ({
            title: 'Mascotas'
        })
    },
    Mascota: {
        screen: mascotaScreen,
        navigationOptions: props => ({
            title: props.navigation.state.params.pet.item.pet.name
        })
    }
});

export default RestaurantsScreenStacks;