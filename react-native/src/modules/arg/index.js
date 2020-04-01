/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator,
  ViroVRSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE",
}

var UNSET = "UNSET";
var MEASURE = "MEASURE";
var LEVEL_1 = "LEVEL_1";
var LEVEL_2 = "LEVEL_2";
var LEVEL_3 = "LEVEL_3";
var LEVEL_4 = "LEVEL_4";
var LEVEL_5 = "LEVEL_5";
var THEATRE = "THEATRE";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var levelSelect = UNSET;

export default class Arg extends Component {
  constructor() {
    super();

    this.state = {
      levelSelect: levelSelect,
      sharedProps: sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._fetchScene = this._fetchScene.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.levelSelect == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.levelSelect == LEVEL_1) {
      return this._getARNavigator(0);
    } else if (this.state.levelSelect == LEVEL_2) {
      return this._getARNavigator(1);
    } else if (this.state.levelSelect == LEVEL_3) {
      return this._getARNavigator(2);
    } else if (this.state.levelSelect == LEVEL_4) {
      return this._getARNavigator(3);
    } else if (this.state.levelSelect == LEVEL_5) {
      return this._getARNavigator(4);
    } else if (this.state.levelSelect == THEATRE) {
      return this._getARNavigator(5, true);
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          {/* MEASURE */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LEVEL_1)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Level 1</Text>
          </TouchableHighlight>

          {/* LEVEL 1 */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LEVEL_2)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Level 2</Text>
          </TouchableHighlight>

          {/* LEVEL 2 */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(THEATRE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Theatre</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator(level, vr) {
    if (vr) {
      let selectionScene = level >= 0 ? this._fetchScene(level) : InitialARScene;
      return (
        <ViroVRSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: selectionScene }} />
      );
    } else {
      let selectionScene = level >= 0 ? this._fetchScene(level) : InitialARScene;
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: selectionScene }} />
      );
    }
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
      require('./Level1'),
      require('./Level2'),
      require('./Level3'),
      require('./Level4'),
      require('./Level5'),
      require('./Theatre'),
    ];
    return sceneSelect[i];
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = Arg
