import React, {useState, useEffect}from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOptions'
import {withNavigation, NavigationEvents} from 'react-navigation';

 function UserLogged(props){
    const{navigation} = props;
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0])
            
        })();
    },[]);

    return(
        <View style={styles.viewUserInfo}>
            <InfoUser userInfo={userInfo}/>
            <AccountOptions navigation={navigation}/>
            <Button 
            title='cerrar sesion'
             onPress={() => firebase.auth().signOut()}
             buttonStyle={styles.btnCloseSession}
             titleStyle={styles.btnCloseSessionText}/>
        </View>
    )
}

export default withNavigation(UserLogged)

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor:'#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: '#00a680'
    }
})
