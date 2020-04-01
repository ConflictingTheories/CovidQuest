'use strict';

import React, { Component } from 'react';
import { StyleSheet, PermissionsAndroid, Platform,DeviceEventEmitter } from 'react-native';
import {AsyncStorage} from '@react-native-community/async-storage';
import RNSimpleCompass from 'react-native-simple-compass';
import ReactNativeHeading from 'react-native-heading';
import {
  ViroARScene,
  ViroVideo,
  ViroConstants,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroMaterials,
  ViroNode,
  ViroButton,
  ViroImage,
} from 'react-viro';


const degree_update_rate = 3; // Number of degrees changed before the callback is triggered

var buttonSize = 0.25;
var VIDEO_REF = "videoref";
var VideoControlRef = "VideoControlRef";

var videos = [
 'https://covidquest-public.s3.ca-central-1.amazonaws.com/what-is-c19.mp4',
];

export default class Level1 extends Component {

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
      videoPaused: false,
      videoIndex: 0,
      loopVideo: false,
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

  _onVideoTapped(){
    var videoControlsAnimationState = this.state.videoControlsAnimation;
    if (videoControlsAnimationState=="fadeIn"){
      videoControlsAnimationState="fadeOut";
    } else {
      videoControlsAnimationState="fadeIn";
    }

    this.setState({
      videoControlsAnimation:videoControlsAnimationState,
      runAnimation:true,
    });
  }
  
  _renderVideoControl(){
    return(
        <ViroNode position={[0,-0.8,0]} opacity={1.0}
          animation={{ name : this.state.videoControlsAnimation, run : this.state.runAnimation, loop : false}} >
          <ViroImage
            scale={[1.4, 1.2, 1]}
            position={[0, -0.27,-2.1]}
            source={require("./res/player_controls_container.png")} />

          <ViroButton
            position={[-buttonSize-0.1,0,-2]}
            scale={[1, 1, 1]}
            width={buttonSize}
            height={buttonSize}
            source={require("./res/previous.png")}
            hoverSource={require("./res/previous_hover.png")}
            clickSource={require("./res/previous_hover.png")}
            onClick={this._playPreviousVideo} />

          {this._renderPlayControl()}

          <ViroButton
            position={[buttonSize+0.1, 0,-2]}
            scale={[1, 1, 1]}
            width={buttonSize}
            height={buttonSize}
            source={require("./res/skip.png")}
            hoverSource={require("./res/skip_hover.png")}
            clickSource={require("./res/skip_hover.png")}
            onClick={this._playNextVideo} />

          <ViroButton
            position={[-0.3, -0.4 ,-2]}
            scale={[1, 1, 1]}
            width={0.5}
            height={0.5}
            source={require("./res/icon_2D_hover.png")}
            hoverSource={require("./res/icon_2D_hover.png")}
            clickSource={require("./res/icon_2D_hover.png")} />

          <ViroButton
            position={[0.3, -0.4 ,-2]}
            scale={[1, 1, 1]}
            width={0.5}
            height={0.5}
            source={require("./res/icon_360.png")}
            hoverSource={require("./res/icon_360_hover.png")}
            clickSource={require("./res/icon_360_hover.png")}
            onClick={this._launchTheatreScene} />

        </ViroNode>
    );
  }

  _renderPlayControl(){
    if (this.state.videoPaused){
      return (
          <ViroButton
              position={[0,0,-2]}
              scale={[1, 1, 1]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/play.png")}
              hoverSource={require("./res/play_hover.png")}
              clickSource={require("./res/play_hover.png")}
              onClick={this._togglePauseVideo}/>
      );
    } else {
      return (
          <ViroButton
              position={[0,0,-2]}
              scale={[1, 1, 1]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/pause.png")}
              hoverSource={require("./res/pause_hover.png")}
              clickSource={require("./res/pause_hover.png")}
              onClick={this._togglePauseVideo}/>
      );
    }
  }

  _launchTheatreScene(){
  }

  _togglePauseVideo() {
    this.setState({
      videoPaused: !this.state.videoPaused,
    })
  }

  _playPreviousVideo(){
    var currentVideo = this.state.videoIndex || 0;
    if (currentVideo - 1 > -1){
      this.setState({
        videoIndex: (currentVideo - 1),
        videoPaused: false
      });
    }
  }

  _playNextVideo(){
    var currentVideo = this.state.videoIndex || 0;
    if (currentVideo + 1 < videos.length){
      this.setState({
        videoIndex: (currentVideo + 1),
        videoPaused: false
      });
    }
  } 


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroVideo ref={VIDEO_REF} source={videos[this.state.videoIndex]} volume={1.0}
            position={[0, 3.9, -45]} scale={[44, 22, 1]} loop={this.state.loopVideo}
            paused={this.state.videoPaused} />

        {this._renderVideoControl()}

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
    var objFinalPosZ = (objPoint.y - devicePoint.y);
    var objFinalPosX = (objPoint.x - devicePoint.x);
    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({ x: objFinalPosX, z: -objFinalPosZ });
  }

}

ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

ViroMaterials.createMaterials({
  opaqueWhite: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#FFFFFF"
  },
});
var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = Level1;
