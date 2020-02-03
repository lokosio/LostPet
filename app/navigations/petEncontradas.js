import {createStackNavigator} from 'react-navigation-stack'
import EncontradasScreen from '../screens/Mascotas/Encontradas'
import addMascotaEncontradaScreen from '../screens/Mascotas/addMascotaEncontrada'
import camaraScreen from '../components/Mascotas/camara'
import imagenScreen from '../components/Mascotas/imagenCapturada'
import Encontradas from '../screens/Mascotas/mascotaEncontrada'
import mapaScreen from '../components/marcadoresEncontradas'
import mascotaMarkerScreen from '../screens/Mascotas/mascotaMarkerEncontradas'
 const encontradasScreenStacks = createStackNavigator({
    Search: {
        screen: EncontradasScreen,
        navigationOptions: () => ({
            title: 'Mascotas Encontradas',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })
    },
    addMascotaEncontrada: {
        screen: addMascotaEncontradaScreen,
        navigationOptions: () => ({
            title: 'Notificar Mascota Encontrada',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })

    },
    Camara: {
        screen: camaraScreen,
        navigationOptions: () => ({
            title: 'Camara',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })

    },
    Foto: {
        screen: imagenScreen,
        navigationOptions: () => ({
            title: 'Imagen',
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })

    },
    Encontrada: {
        screen: Encontradas,
        navigationOptions: () => ({
            title: 'Mascota',
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

export default encontradasScreenStacks;