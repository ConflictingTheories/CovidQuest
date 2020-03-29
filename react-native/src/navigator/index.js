// import React from "react";
// import { Platform, StatusBar, View, Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

// import Map from "../modules/map";
import DrawerNav from "../navigator/drawerNav";
import Splash from '../modules/splashScreen'

const AppNavigator = createStackNavigator(
  {
    Splash:{screen:Splash},
    // Map: { screen: Map },
    DrawerNav: { screen: DrawerNav }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(AppNavigator);
