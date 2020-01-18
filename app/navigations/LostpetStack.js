import {createStackNavigator} from 'react-navigation-stack'
import mascotasScreen from '../screens/Mascotas'
import mascotaScreen from '../screens/Mascotas/mascota'
import MyReportDelete from '../screens/Account/MyReportDelte'
import addMascotasScreen from '../screens/Mascotas/addMascotas'
 const RestaurantsScreenStacks = createStackNavigator({
    Mascotas: {
        screen: mascotasScreen,
        navigationOptions: () => ({
            title: 'Mascotas Perdidas'
        })
    },
    Mascota: {
        screen: mascotaScreen,
        navigationOptions: props => ({
            title: props.navigation.state.params.pet.item.pet.name
        })
    },
    Delete: {
        screen: MyReportDelete,
        navigationOptions: props => ({
            title: 'Mascotas Perdidas'
        })
    },
    
    addMascotas: {
        screen: addMascotasScreen,
        navigationOptions: () => ({
            title: 'Reportar Mascota Perdida'
        })
    }

    

});

export default RestaurantsScreenStacks;