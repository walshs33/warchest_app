import React from 'react';
import { Image, Icon } from 'react-native-elements';
import * as Nav from 'react-navigation';
import firebase from 'react-native-firebase';

import Main from './src/Main';

const mainNav = Nav.createDrawerNavigator(
  {
    Main: {
      screen: Main
    }
  }
);

const appNav = Nav.createStackNavigator(
  {
    App: {
      screen: mainNav,
      navigationOptions: ({navigation}) => ({
        headerLeft: (
          <Icon
            name="menu"
            iconStyle={{marginLeft: 15}}
            onPress={() => navigation.dispatch(Nav.DrawerActions.toggleDrawer())}
          />
        ),
        headerTitle: (
          <Image
            source={require('./assets/logos/logo_black.jpeg')}
            style={{height:40, width:80}}
          />
        ),
      })
    }
  },
  {
    initialRouteName: 'App'
  }
);

export default Nav.createAppContainer(appNav);
