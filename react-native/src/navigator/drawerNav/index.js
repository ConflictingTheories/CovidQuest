import React from "react";
import { Dimensions, Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation";

// import Splash from '../../modules/splashScreen'

import HomeDrawer from "../../modules/drawer";
import Map from "../../modules/map";
import Arg from "../../modules/arg";
import Profile from "../../modules/profile";
import Chat from "../../modules/chat";

const deviceWidth = Dimensions.get("screen").width;

export default createDrawerNavigator(
  {
    // Splash:{screen:Splash},
    Map: { screen: Map },
    Arg: { screen: Arg },
    Chat: { screen: Chat },
    Profile: { screen: Profile }
  },
  {
    drawerLockMode: "locked-closed",
    drawerWidth: deviceWidth * 0.55,
    contentComponent: HomeDrawer
  }
);
