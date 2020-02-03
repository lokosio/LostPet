import {createStackNavigator} from 'react-navigation-stack'
import MyAccountScreen from '../screens/Account/MyAccount'
import Login from '../../app/Login';
import Register from '../../app/Registro'
import MyReportes from '../screens/Account/MyReport'
import MyReportDelete from '../screens/Account/MyReportDelte'
import MyReportDeleteEn from '../screens/Account/MyReportDelteEn'
 const MyAccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: 'Mi Cuenta',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
        })
    },
    MisReportess : {
      screen : MyReportes,
      navigationOptions : {
        title : 'mis reportes',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
headerTitleStyle: {
fontWeight: 'bold',
},
      }
    },
    Login : {
        screen : Login,
        navigationOptions : {
          title : 'Login',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
headerTitleStyle: {
  fontWeight: 'bold',
},
        }
      },
      Register : {
        screen : Register,
        navigationOptions : {
          title : 'Registro',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
headerTitleStyle: {
  fontWeight: 'bold',
},
        }
      },
      Delete: {
        screen: MyReportDelete,
        navigationOptions: props => ({
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
    DeleteEn: {
      screen: MyReportDeleteEn,
      navigationOptions: props => ({
          title: 'Mascotas Perdidas',
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

export default MyAccountScreenStacks;