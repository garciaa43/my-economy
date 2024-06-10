import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme } from '@react-navigation/native';
import SettingsScreen from '../settings/Settings';
import ProfileScreen from '../profile/Profile';
import HomeScreen from '../home/Home';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigatorScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // tabBarOptions: {
        //   activeTintColor: 'green',
        //   inactiveTintColor: DefaultTheme.colors.text,
        // },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigatorScreen;
