import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  Button,
  View,
  Platform,
  Easing,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator,
  ViroVRSceneNavigator
} from 'react-viro';

import DeviceInfo from "react-native-device-info";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { getDeviceId } from "../../components/deviceInfo";
import { getData } from "../../service/user";
import { styles as mapStyles } from "../../style"
import * as PlatformUtils from '../arg/ARDrivingCarDemo/PlatformUtils';

var joystickWidth = 200;

const UNSET = "UNSET";
const MEASURE = "MEASURE";
const LEVEL_1 = "LEVEL_1";
const LEVEL_2 = "LEVEL_2";
const HEART = "HEART";
const THEATRE = "THEATRE";
const BCARD = "BCARD";
const POSTER = "POSTER";
const PHYSICS = "PHYSICS";
const OTHER = "OTHER";
const PARTICLES = "PARTICLES";
const VRPHYSICS = "VRPHYSICS";
const PRODUCTS = "PRODUCTS"

var apiKey = "YOUR_API_KEY_HERE";


const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

const challengeList = [
  {
    id: "LVL1",
    name: "Level 1",
    date: new Date().toString(),
    difficulty: "⍟⍟⍟",
    level: LEVEL_1,
    latitude: 51.0000,
    longitude: -114.0000
  },
  {
    id: "LVL2",
    name: "Level 2",
    date: new Date().toString(),
    difficulty: "⍟⍟⍟⍟",
    level: LEVEL_2,
    latitude: 51.0200,
    longitude: -114.0300
  },
  {
    id: "LVL3",
    name: "Level 3",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟⍟",
    level: MEASURE,
    latitude: 51.001,
    longitude: -114.103
  },
  {
    id: "LVL4",
    name: "Level 4",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: HEART,
    latitude: 51.231,
    longitude: -114.113
  },
  {
    id: "LVL5",
    name: "Level 5",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: OTHER,
    latitude: 51.331,
    longitude: -114.313
  },
  {
    id: "LVL6",
    name: "Level 6",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: BCARD,
    latitude: 51.251,
    longitude: -114.193
  },
  {
    id: "LVL7",
    name: "Level 7",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: POSTER,
    latitude: 51.271,
    longitude: -114.123
  },
  {
    id: "LVL8",
    name: "Level 8",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: PHYSICS,
    latitude: 51.231,
    longitude: -114.413
  },
  {
    id: "LVL9",
    name: "Level 9",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: PARTICLES,
    latitude: 51.631,
    longitude: -114.613
  },
  {
    id: "LVL10",
    name: "Level 10",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: PRODUCTS,
    latitude: 51.731,
    longitude: -114.913
  },
  {
    id: "LVL11",
    name: "Level 11",
    date: new Date().toDateString(),
    difficulty: "⍟⍟⍟",
    level: VRPHYSICS,
    latitude: 51.231,
    longitude: -114.113
  },
]

const localStyle = {
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
}
var sharedProps = {
  apiKey: "API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('../arg/InitialScene');

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var levelSelect = UNSET;

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelSelect: levelSelect,
      sharedProps: sharedProps,
      focusedLocation: {
        latitude: 100,
        latitudeDelta: 0.015,
        longitude: 100,
        longitudeDelta: 0.0121
      },
      challenges: challengeList,
      data: null,
      initialLatitude: 100,
      initialLongitude: 100,
      initiallatitudeDelta: 0.015,
      initiallongitudeDelta: 0.0121,
      rigLatitude: null,
      rigLongitude: null,
      device_key: null,
      device_id: DeviceInfo.getDeviceId(),
      // initial state here
      showInstructions : true,
      instructionOpacity : new Animated.Value(1),
      carControlsOpacity : new Animated.Value(0),
      isReady : false,
      isOverPlane : false,
      left : false,
      up : false,
      right : false,
      down : false,
      touchLocation : "0,0",
      leftRightRatio : 0,
      shouldResetCar : false,
      isRecording : false,
      shouldPlayMedia : true, // whether or not the AR session should play media (probably because its hidden)
      hours : '00',
      minutes : '00',
      seconds : '00',
    };

    // bind functions here
    this.getViroARView = this.getViroARView.bind(this);
    this.exitAR = this.exitAR.bind(this);

    //this.getRecordingUI = this.getRecordingUI.bind(this);
    this.getReadyUI = this.getReadyUI.bind(this);
    this.ready = this.ready.bind(this);
    this.getInstructions = this.getInstructions.bind(this);

    this.setIsOverPlane = this.setIsOverPlane.bind(this);

    this.resetCar = this.resetCar.bind(this);

    this.getCarControls = this.getCarControls.bind(this);
    this.getDrivingPedals = this.getDrivingPedals.bind(this);
    this.getJoystick = this.getJoystick.bind(this);
    this.getResetButton = this.getResetButton.bind(this);

    this.getPressDown = this.getPressDown.bind(this);
    this.getPressUp = this.getPressUp.bind(this);

    this.joystickStart = this.joystickStart.bind(this);
    this.joystickMove = this.joystickMove.bind(this);
    this.joystickEnd = this.joystickEnd.bind(this);
    this.setJoystickProps = this.setJoystickProps.bind(this);

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        focusedLocation: {
          latitude: position.coords.latitude,
          latitudeDelta: 0.015,
          longitude: position.coords.longitude,
          longitudeDelta: 0.0121
        },
        initialLatitude: position.coords.latitude,
        initialLongitude: position.coords.longitude
      });
    });

    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._fetchScene = this._fetchScene.bind(this);
    this._getData = this._getData.bind(this);
    this._getMap = this._getMap.bind(this);
    this._renderMarker = this._renderMarker.bind(this);
  }

  onPressZoomIn() {
    this.region = {
      latitude: this.state.focusedLocation.latitude,
      latitudeDelta: this.state.focusedLocation.latitudeDelta * 10,
      longitude: this.state.focusedLocation.longitude,
      longitudeDelta: this.state.focusedLocation.longitudeDelta * 10
    };

    this.setState({
      focusedLocation: {
        latitude: this.region.latitude,
        latitudeDelta: this.region.latitudeDelta,
        longitude: this.region.longitude,
        longitudeDelta: this.region.longitudeDelta
      }
    });
    // this.map.animateToRegion(this.region, 100);
  }

  onPressZoomOut() {
    this.region = {
      latitude: this.state.focusedLocation.latitude,
      latitudeDelta: this.state.focusedLocation.latitudeDelta / 10,
      longitude: this.state.focusedLocation.longitude,
      longitudeDelta: this.state.focusedLocation.longitudeDelta / 10
    };
    this.setState({
      focusedLocation: {
        latitudeDelta: this.region.latitudeDelta,
        latitude: this.region.latitude,
        longitudeDelta: this.region.longitudeDelta,
        longitude: this.region.longitude
      }
    });
    // this.map.animateToRegion(this.region, 100);
  }

  async componentDidMount() {
    console.log("this", this.state.device_id);
    var id = await getDeviceId();
    console.log("id newwww------.>>>>>>>>", id);
    this._getData(id);
  }

  //GET THE RIG DATAS FROM THE API
  _getData(id) {
    navigator.geolocation.getCurrentPosition(async position => {
      var res = await getData({
        device_id: id,
        platform: Platform.OS,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      console.log("response", res);
      this.setState({ data: res, challenges: challengeList });
    });
  }

  //ON CHANGE REGION LOCATION STATE CHENGING
  onRegionChange(region) {
    // return console.log("regionnnnnn",region)
    // return(
    // this.setState({ focusedLocation: region})
    // )
    // this.setState({ focusedLocation:region });
  }


  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.levelSelect == UNSET) {
      return this._getMap();
    } else if (this.state.levelSelect == MEASURE) {
      return this._getARNavigator(0)
    } else if (this.state.levelSelect == LEVEL_1) {
      return this._getARNavigator(1)
    } else if (this.state.levelSelect == LEVEL_2) {
      return this._getARNavigator(2)
    } else if (this.state.levelSelect == HEART) {
      return this._getARNavigator(3,true)
    } else if (this.state.levelSelect == THEATRE) {
      return this._getARNavigator(4,true)
    } else if (this.state.levelSelect == BCARD) {
      return this._getARNavigator(5)
    } else if (this.state.levelSelect == POSTER) {
      return this._getARNavigator(6)
    } else if (this.state.levelSelect == PHYSICS) {
      return this._getARNavigator(7)
    } else if (this.state.levelSelect == PARTICLES) {
      return this._getARNavigator(8, true)
    } else if (this.state.levelSelect == PRODUCTS) {
      return this._getARNavigator(9,true)
    } else if (this.state.levelSelect == VRPHYSICS) {
      return this._getARNavigator(10,true)
    } else if (this.state.levelSelect == OTHER) {
      return (<View style={styles.outerContainer}>
        
      {this.getViroARView()}

      {this.getCarControls()}

      {/* Get instructions and ready */}
      {this.getReadyUI()}
      {this.getInstructions()}

    </View>)
    }
  }

  //Map Page
  _getMap() {
    const { challenges } = this.state;
    console.log("Challenges", challenges);
    return (
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          customMapStyle={mapStyle}
          mapType={"standard"}
          showsScale={true}
          region={this.state.focusedLocation}
          onRegionChangeComplete={this.onRegionChange}
        >
          {challenges.map(this._renderMarker)}
        </MapView>

        <View
          style={{
            flex: 1,
            marginTop: "10%",
            marginEnd: "80%",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/menu-three-horizontal-lines-symbol.png")}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={this._getExperienceButtonOnPress(LEVEL_1)}
        >
          <Image
            style={{ width: 30, height: 30, marginStart: "81%" }}
            source={require("../../assets/germ.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          onPress={() => {
            this.onPressZoomOut();
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginStart: "81%" }}
            source={require("../../assets/plus.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            // height: 10,
            marginBottom: Platform.OS === "android" ? 18 : "20%"
          }}
          onPress={() => {
            this.onPressZoomIn();
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginStart: "81%" }}
            source={require("../../assets/substract.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator(level, vr) {
    if (vr) {
      let selectionScene = level >= 0 ? this._fetchScene(level) : InitialARScene;
      return (
        <View style={{ flex: 1 }}>
          <ViroVRSceneNavigator {...this.state.sharedProps}
            initialScene={{ scene: selectionScene }} />
          <TouchableOpacity style={localStyle.bottomView} onPress={this._getExperienceButtonOnPress(UNSET)} ></TouchableOpacity>
        </View>
      );
    } else {
      let selectionScene = level >= 0 ? this._fetchScene(level) : InitialARScene;
      return (
        <View style={{ flex: 1 }}>
          <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{ scene: selectionScene }} />
          <TouchableOpacity style={localStyle.bottomView} onPress={this._getExperienceButtonOnPress(UNSET)} ></TouchableOpacity>
        </View>
      );
    }
  }

  // Render Challenge Marker
  _renderMarker(challenge) {
    console.log("Event Challenge", challenge);
    return (
      <MapView.Marker
        pinColor={"#FFFF00"}
        key={challenge.id}
        coordinate={{
          latitude: parseFloat(challenge.latitude),
          longitude: parseFloat(challenge.longitude)
        }}
      >
        <MapView.Callout onPress={this._getExperienceButtonOnPress(challenge.level)}
          tooltip={true}>
          <View style={mapStyles.markerDescription}>
            <Text style={{ fontSize: 14, color: "#fff" }}>{challenge.name}</Text>
            <Text style={{ fontSize: 12, paddingTop: 5, color: "#fff" }}>
              Difficulty:{challenge.difficulty}{" "}
            </Text>
            <Text style={{ fontSize: 10, color: "#fff" }}>
              Created On:{challenge.date}
            </Text>
            <Button
              title={"Open Level"}
            />
          </View>
        </MapView.Callout>
      </MapView.Marker>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(levelSelect) {
    return () => {
      this.setState({
        levelSelect: levelSelect
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }

  // Fetch Scene
  _fetchScene(i) {
    const sceneSelect = [
      InitialARScene,
      require('../arg/Level1'),
      require('../arg/Level2'),
      require('../arg/HumanHeart'),
      require('../arg/Theatre'),
      require('../arg/ARBusinessCard/BusinessCard'),
      require('../arg/ARPosterDemo/ARPosterDemo'),
      require('../arg/ARPhysicsSample/BasicPhysicsSample'),
      require('../arg/ParticleEmitters/ViroParticleTemplates'),
      require('../arg/ProductShowcase/ProductShowcase'),
      require('../arg/PhysicsSample/BasicPhysicsSample'),
      require('../arg/ARDrivingCarDemo/ARDrivingCar'),
    ];
    return sceneSelect[i];
  }


  getViroARView() {
    // use viroAppProps to pass in "changing/dynamic" values, passProps is "not" dynamic.
    let viroAppProps = {
      direction : (this.state.left ? 1 : 0) + (this.state.up ? 2 : 0) + (this.state.right ? 4 : 0) + (this.state.down ? 8 : 0),
      leftRightRatio : this.state.leftRightRatio,
      shouldResetCar : this.state.shouldResetCar,
      isReady : this.state.isReady,
      setIsOverPlane : this.setIsOverPlane,
    }
    return (
      <ViroARSceneNavigator
        ref={(ref)=>{this.arNavigator = ref}}
        apiKey={apiKey}
        viroAppProps={viroAppProps}
        initialScene={{
          scene: require('../arg/ARDrivingCarDemo/ARDrivingCarScene.js'),
          passProps: {
            onARInitialized: this.onARInitialized,
            onPosterFound: this.onPosterFound,
            onExperienceFinished : this.onExperienceFinished,
            onARSceneCreated : this.onARSceneCreated,
          },
        }} />
    );
  }

  getCarControls() {

    return (
      <Animated.View style={{position : 'absolute', width : '100%',
                             height : '100%', opacity : this.state.carControlsOpacity}}>
        {/* These are the controls to drive the car */}
        {this.getDrivingPedals()}
        {this.getResetButton()}
        {this.getJoystick()}
      </Animated.View>
    )
  }

  getDrivingPedals() {
    return (
      <View style={styles.drivingButtonsContainer} >

        <View style={styles.drivingButton} >
          <Image style={styles.pedalImage} opacity={this.state.down ? 0 : 1}
            source={require('../arg/ARDrivingCarDemo/res/pedal_reverse.png')} />
          <Image style={styles.pedalImage} opacity={!this.state.down ? 0 : 1} 
            source={require('../arg/ARDrivingCarDemo/res/pedal_reverse_press.png')}/>
          <View style={styles.pedalTouchArea} onTouchStart={this.getPressDown('down')}
          onTouchEnd={this.getPressUp('down')} />
        </View>

        <View style={styles.drivingButton} >
          <Image style={styles.pedalImage} opacity={this.state.up ? 0 : 1}
            source={require('../arg/ARDrivingCarDemo/res/pedal_accel.png')} />
          <Image style={styles.pedalImage} opacity={!this.state.up ? 0 : 1} 
            source={require('../arg/ARDrivingCarDemo/res/pedal_accel_press.png')}/>
          <View style={styles.pedalTouchArea} onTouchStart={this.getPressDown('up')}
          onTouchEnd={this.getPressUp('up')} />
        </View>

      </View>
    )
  }

  getJoystick() {
    let rotation = '' + (this.state.left ? '-' : '') + Math.round(this.state.leftRightRatio * 90) + 'deg'

    let joystickButtonStyle = {
      height: 130,
      width: 200,
      resizeMode : 'contain',
      transform: [{rotate : rotation}]
    }

    /*
      This is the joystick/steering wheel component, since the image is rotating, we need
      that "invisible" view to capture the touch events.
     */
    return (
      <View style={styles.joystickContainer} >
        <Image style={joystickButtonStyle} source={require('../arg/ARDrivingCarDemo/res/steering_wheel.png')}/>
        <View style={styles.joystickTouchArea} onTouchStart={this.joystickStart} 
        onTouchMove={this.joystickMove} onTouchEnd={this.joystickEnd} />
      </View>
    )
  }

  getResetButton() {
    return (
      <TouchableOpacity
        style={styles.resetButton}
        onPress={this.resetCar}
        activeOpacity={0.6} >
        <Image style={styles.resetImage} source={require('../arg/ARDrivingCarDemo/res/icon_refresh.png')}/>
      </TouchableOpacity>
    )
  }

  resetCar() {
    this.setState({
      shouldResetCar : true,
    })

    // reset the flag 1 second later.
    setTimeout(()=>{
      this.setState({
        shouldResetCar : false,
      })
    }, 1000)
  }

  getPressDown(key) {
    return ()=>{
      let dict = {}
      dict[key] = true
      this.setState(dict)
    }
  }

  getPressUp(key) {
    return ()=>{
      let dict = {}
      dict[key] = false
      this.setState(dict)
    }
  }

  joystickStart(evt) {
    this.setJoystickProps(evt);
  }

  joystickMove(evt) {
    this.setJoystickProps(evt);
    this.setState({
      touchLocation : "" + evt.nativeEvent.locationX.toFixed(2) + ", " + evt.nativeEvent.locationY.toFixed(2) + ", " + evt.nativeEvent.pageX.toFixed(2) + ", " + evt.nativeEvent.pageY.toFixed(2)
    })
  }

  joystickEnd(evt) {
    this.setState({
      left : false,
      right : false,
      leftRightRatio : 0,
    })
  }

  setJoystickProps(evt) {
    let locationX = evt.nativeEvent.locationX; // position relative to top left of view
    let pageX = evt.nativeEvent.pageX; // position relative to top left of screen
    let leftValue = false;
    let rightValue = false;
    let ratio = 0;
    let halfWidth = joystickWidth / 2;
    if (Platform.OS == 'android') {
      // on Android, the locationX reverts to pageX when off the button/view
      if (locationX != pageX) {
        if (locationX <= halfWidth) {
          leftValue = true;
          ratio = (halfWidth - locationX) / halfWidth
        } else {
          rightValue = true;
          ratio = (halfWidth - joystickWidth + locationX) / halfWidth
        }
      } else {
        /*
        if we went off the button to the left or right, then we simply set the
        ratio to max (1)
        */
        // TODO: this isn't actually accurate, we need to keep track of where
        // relative to the top left corner of the button because a soon as we
        // leave the button, we get all page coordinates. keep track on "down"
        ratio = 1;
        leftValue = this.state.left;
        rightValue = this.state.right;
      }
    } else { // iOS
      if (locationX <= 0 || locationX >= joystickWidth) {
        ratio = 1;
        leftValue = this.state.left;
        rightValue = this.state.right;
      } else {
        if (locationX <= halfWidth) {
          leftValue = true;
          ratio = (halfWidth - locationX) / halfWidth
        } else {
          rightValue = true;
          ratio = (halfWidth - joystickWidth + locationX) / halfWidth
        }
      }
    }

    this.setState({
      left : leftValue,
      right : rightValue,
      leftRightRatio : Math.max(Math.min(ratio, 1), 0), // bound ratio to 0 -> 1
    })
  }

  getReadyUI() {

    if (this.state.showInstructions) {

      let text = this.state.isOverPlane ? ' ' : 'Finding the floor...'

      let overlayStyle = {
        position : 'absolute',
        width : '100%',
        height : '100%',
      }

      let readyButton = {
        height: 60,
        width: 130,
        marginTop : 10,
        backgroundColor:'#292930B3',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent : 'center',
        alignItems : 'center',
        opacity : this.state.isOverPlane ? 1 : .5,
      }

      return (
        <Animated.View style={{...overlayStyle, opacity : this.state.instructionOpacity}}>
          <View style={styles.readyContainer}>
            <Text style={styles.instructionText}>
              {text}
            </Text>
            <TouchableOpacity
              style={readyButton}
              opacity={.5}
              onPress={this.ready}
              disabled={!this.state.isOverPlane}
              activeOpacity={0.6}>
              <Text style={styles.instructionText}>
                Place
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )
    }
  }

  ready() {
    // only allow ready to be clicked when the user has click over a plane!
    if (!this.state.isOverPlane) {
      return;
    }

    Animated.timing(this.state.instructionOpacity, {
      toValue : 0,
      duration : 1000,
      easing : Easing.linear,
    }).start(()=>{
      this.setState({
        showInstructions : false,
        isReady : true,
      })
    })

    setTimeout(()=>{
      Animated.timing(this.state.carControlsOpacity, {
        toValue : 1,
        duration : 500,
        easing : Easing.linear,
      }).start()
    }, 1000)
  }

  getInstructions() {

    if (!this.state.showInstructions) {
      return
    }

    var instructionContainer = {
      position : 'absolute',
      backgroundColor : '#000000B3',
      flexDirection : 'column',
      width : '100%',
      height : 100,
      justifyContent : 'center',
      top : 0,
      left : 0,
      paddingTop : paddingTop,
    }

    let instructions = "Scan the ground and tap Place to begin."

    return (
      <Animated.View style={{...instructionContainer, opacity : this.state.instructionOpacity}}>
        <Text style={styles.instructionText}>
          {instructions}
        </Text>
      </Animated.View>
    )
  }

  // this function will be called by the AR system when the user is hovering over a plane
  setIsOverPlane(isOverPlane) {
    if (this.state.isOverPlane != isOverPlane) {
      this.setState({
        isOverPlane : isOverPlane,
      })
    }
  }

  exitAR() {
    this.props.navigation.goBack();
  }

}

module.exports = Map


// on AR screens the padding is only added for iPhone X
let extraInstructionHeight = PlatformUtils.isIPhoneX() ? 5 : 0;
let paddingTop = PlatformUtils.isIPhoneX() ? PlatformUtils.iOSTopPadding + extraInstructionHeight : 0;
let paddingBottom = PlatformUtils.isIPhoneX() ? PlatformUtils.iPhoneXBottomPadding : 0;

var styles = StyleSheet.create({
  outerContainer : {
    flex : 1,
    flexDirection : 'column',
  },
  titleText : {
    color : 'white',
    fontSize : 20,
    fontWeight : '400',
    textAlign : 'center',
    fontFamily : 'BebasNeue-Regular',
  },
  instructionText : {
    color : 'white',
    fontSize : 18,
    textAlign : 'center',
    fontFamily : 'BebasNeue-Regular',
  },
  readyContainer : {
    position : 'absolute',
    height : 170,
    width : '100%',
    bottom : 0,
    left : 0,
    justifyContent : 'center',
    alignItems : 'center',
  },
  exitButton : {
    position: 'absolute',
    // Use padding vs "top"/"left" so that the entire zone is tappable
    paddingLeft : 15,
    paddingTop : 27 + paddingTop,
  },
  exitImage : {
    height: 21,
    width: 21,
    resizeMode : 'stretch',
  },
  joystickContainer : {
    position : 'absolute',
    height: 130,
    width: 200,
    marginBottom: 10,
    marginLeft : 5,
    bottom : 10, 
    left : 10,
  },
  joystickTouchArea : {
    position : 'absolute',
    height: 130,
    width: 200,
    // Android needs a background color on views or it won't be touchable
    backgroundColor : '#ffffff00',
  },
  resetButton : {
    position : 'absolute',
    width : 30,
    height : 30,
    right : 15,
    top : 24 + paddingTop,
  },
  resetImage : {
    width : 30,
    height : 30,
    resizeMode : 'contain',
  },
  directionText : {
    position : 'absolute',
    top : 50,
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  drivingButtonsContainer : {
    position : 'absolute',
    flexDirection : 'row',
    bottom : 25,
    right : 10,
    width : 150,
    justifyContent: 'space-between',
    alignItems : 'center',
  },
  drivingButton : {
    height: 70,
    width: 70,
    marginTop: 10,
    marginBottom: 10,
    marginLeft : 5,
    marginRight : 5,
  },
  pedalImage : {
    position : 'absolute',
    height : 70,
    width : 70,
  },
  pedalTouchArea : {
    position : 'absolute',
    height : 70,
    width : 70,
    // Android needs a background color on views or it won't be touchable
    backgroundColor : '#ffffff00',
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  touchText : {
    position : 'absolute',
    top : 10,
    left : 0,
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  attributionOverlay : {
    position : 'absolute',
    width : '100%',
    height : '100%',
    backgroundColor : 'black',
    justifyContent : 'center',
    alignItems : 'center',
  },
  attributionMovieLogoContainer : {
    position : 'absolute',
    top : 100,
    flexDirection : 'column',
  },
  attributionMovieLogo : {
    width : 300,
    height : 75,
    resizeMode : 'contain',
    marginBottom : 15,
  },
  attributionLoadingContainer : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
  },
  attributionViroLogo : {
    position : 'absolute',
    bottom : 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 60,
    resizeMode : 'contain',
  },
});