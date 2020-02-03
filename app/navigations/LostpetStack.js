import {createStackNavigator} from 'react-navigation-stack'
import mascotasScreen from '../screens/Mascotas'
import mascotaScreen from '../screens/Mascotas/mascota'

import addMascotasScreen from '../screens/Mascotas/addMascotas'
import mapaScreen from '../components/marcadores'
import mascotaMarkerScreen from '../screens/Mascotas/mascotaMarker'
 const RestaurantsScreenStacks = createStackNavigator({
    Mascotas: {
        screen: mascotasScreen,
        navigationOptions: () => ({
            title: 'Mascotas Perdidas',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })
    },
    Mascota: {
        screen: mascotaScreen,
        navigationOptions: props => ({
            title: props.navigation.state.params.pet.item.pet.name,
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })
    },
    
    
    addMascotas: {
        screen: addMascotasScreen,
        navigationOptions: () => ({
            title: 'Reportar Mascota Perdida',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
              },
        })
    },
    Mapa: {
      screen: mapaScreen,
      navigationOptions: () => ({
          title: 'Reportar Mascota Perdida',
          headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
      })
  },
  MascotaMarker: {
    screen: mascotaMarkerScreen,
    navigationOptions: () => ({
        title: 'Reportar Mascota Perdida',
        headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
    })
}


    

});

export default RestaurantsScreenStacks;