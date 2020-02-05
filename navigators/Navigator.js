import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import AuthLoading from "../views/AuthLoading";
import Login from "../views/Login";
import React from 'react';
import { Icon } from 'native-base';
import Upload from "../views/Upload";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
    Upload,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        } else if (routeName === 'Upload') {
          iconName = 'cloud-upload';
        }
        return <Icon
          name={iconName}
          size={25}
        />;
      },
    }),
  }
);

TabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];

  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerMode: 'none', // this will hide the header
      },
    },
    Single: {
      screen: Single,
    },
    Logout: {
      screen: Login,
    },
    Upload: {
      screen: Upload,
    }
  },
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(Navigator);
