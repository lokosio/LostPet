import {createStackNavigator} from 'react-navigation-stack'
import SearchScreen from '../components/marcadores'
 const SearchScreenStacks = createStackNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: () => ({
            title: 'Buscar',
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

export default SearchScreenStacks;