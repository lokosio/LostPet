import {createStackNavigator} from 'react-navigation-stack'
import MyAccountScreen from '../screens/Account/MyAccount'
import Login from '../../app/Login';
import Register from '../../app/Registro'

 const MyAccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: 'Mi Cuenta'
        })
    },
    Login : {
        screen : Login,
        navigationOptions : {
          title : 'Login'
        }
      },
      Register : {
        screen : Register,
        navigationOptions : {
          title : 'LostPet'
        }
      }
});

export default MyAccountScreenStacks;