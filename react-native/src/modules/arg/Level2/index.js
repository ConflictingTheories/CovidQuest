'use strict';

import React, { Component } from 'react';
import { StyleSheet, PermissionsAndroid, Platform, AsyncStorage,DeviceEventEmitter } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';
import ReactNativeHeading from 'react-native-heading';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroBox,
  ViroFlexView,
  ViroImage,
} from 'react-viro';


const degree_update_rate = 3; // Number of degrees changed before the callback is triggered

export default class Level2 extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      text2: "...Loading",
      text3: "...Loading",
      latitude: 0,
      longitude: 0,
      focusedLocation: {
        latitude: 0,
        latitudeDelta: 0.015,
        longitude: 0,
        longitudeDelta: 0.0121
      },
      error: null,
      pos: {
        x: 0,
        y: 0,
        z: 0
      },
      Degree: 0,
      headingAngle: 0
    }

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);

    // Get Location
    navigator.geolocation.getCurrentPosition(position => {
      let pos = this._transformPointToAR(position.coords.latitude, position.coords.longitude)
      this.setState({
        focusedLocation: {
          latitude: position.coords.latitude,
          latitudeDelta: 0.015,
          longitude: position.coords.longitude,
          longitudeDelta: 0.0121
        },
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        pos
      });
    });

    // Start Compass
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      this.setState({ Degree: degree });
      RNSimpleCompass.stop();
    });
  }

  updateHead() {
    AsyncStorage.setItem('headstart', JSON.stringify(this.state.headingAngle))
  }

  componentDidMount() {
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      // this.callLocation(that);
    } else {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            // that.callLocation(that);
          } else {
            console.log("Permission Denied");
          }
        } catch (err) {
          console.log("err", err);
          console.warn(err)
        }
      }
      requestCameraPermission();
    }

    ReactNativeHeading.start(1)
      .then(didStart => {
        this.setState({
          headingIsSupported: didStart,
        })
      })
    var flag = 0
    DeviceEventEmitter.addListener('headingUpdated', heading => {
      this.setState({ headingAngle: heading })
      //console.log('heading State',heading)
      if (flag == 0) {
        this.updateHead()
      }
      flag = 1
    });
    this.updateHead()
  }

  componentWillUnmount() {
    ReactNativeHeading.stop();
    DeviceEventEmitter.removeAllListeners('headingUpdated');
  }

  getData() {
    navigator.geolocation.getCurrentPosition(async position => {
      let pos = this._transformPointToAR(position.coords.latitude, position.coords.longitude)
      console.log("latitude", position.coords.latitude);
      this.setState({
        focusedLocation: {
          latitude: position.coords.latitude,
          latitudeDelta: 0.015,
          longitude: position.coords.longitude,
          longitudeDelta: 0.0121
        },
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        pos
      });
    });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARImageMarker target={"targetOne"} >
          <ViroText text={this.state.latitude.toFixed(4)} scale={[0, 0.5, -1]} position={[0, 0, 0.1]} style={localStyles.helloWorldTextStyle} />
          <ViroText text={this.state.longitude.toFixed(4)} scale={[0, 0, -1]} position={[0, 0, 0.1]} style={localStyles.helloWorldTextStyle} />
        </ViroARImageMarker>
        <ViroFlexView style={{ flexDirection: 'row', padding: .1 }}
          width={5.0} height={5.0}
          position={[-5.0, 0.0, -2.0]}
          rotation={[0, 45, 0]} >
          <ViroImage source={require('../../../assets/guadalupe_360.jpg')} style={{ flex: .5 }} />
          <ViroImage source={require('../../../assets/guadalupe_360.jpg')} style={{ flex: .5 }} />
        </ViroFlexView>

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={localStyles.helloWorldTextStyle} />
        <ViroText text={JSON.stringify(this.state.pos)} scale={[0, 1, -4]} position={[0, 0, -1]} style={localStyles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    // Fetch Data & Location
    this.getData();

    // Outside of the render function, register the target
    ViroARTrackingTargets.createTargets({
      "targetOne": {
        source: require('../../../assets/guadalupe_360.jpg'),
        orientation: "Up",
        physicalWidth: 0.1 // real world width in meters
      },
    });

    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Look Behind You!",
        text2: "There is one more clue...",
        text3: "Found IT!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _latLongToMerc(lat_deg, lon_deg) {
    var lon_rad = (lon_deg / 180.0 * Math.PI)
    var lat_rad = (lat_deg / 180.0 * Math.PI)
    var sm_a = 637813.70
    var xmeters = sm_a * lon_rad
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
    return ({ x: xmeters, y: ymeters });
  }

  _transformPointToAR(lat, long) {
    AsyncStorage.getItem('headstart')
      .then(res => { console.log('HeadAngle', res), this.setState({ headAngle: res }) })
    var objPoint = this._latLongToMerc(lat, long);
    var devicePoint = this._latLongToMerc(this.state.latitude, this.state.longitude);
    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR
    var objFinalPosZ = (objPoint.y - devicePoint.y);
    var objFinalPosX = (objPoint.x - devicePoint.x);
    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({ x: objFinalPosX, z: -objFinalPosZ });
  }

}

var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = Level2;