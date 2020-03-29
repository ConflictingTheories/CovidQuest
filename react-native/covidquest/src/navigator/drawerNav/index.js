import React from "react";
import { Dimensions, Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation";

// import Splash from '../../modules/splashScreen'

import HomeDrawer from "../../modules/drawer";
import Map from "../../modules/map";
import Arg from "../../modules/arg";

const deviceWidth = Dimensions.get("screen").width;

export default createDrawerNavigator(
  {
    // Splash:{screen:Splash},
    Map: { screen: Map },
    Arg: { screen: Arg }
  },
  {
    drawerLockMode: "locked-closed",
    drawerWidth: deviceWidth * 0.55,
    contentComponent: HomeDrawer
  }
);
