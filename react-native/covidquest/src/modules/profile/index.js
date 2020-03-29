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


export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      levelSelect : levelSelect,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
      return this._getExperienceSelector();
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Profile
          </Text>

          {/* MEASURE */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(MEASURE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Measure</Text>
          </TouchableHighlight>

          {/* LEVEL 1 */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LEVEL_1)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Level 1</Text>
          </TouchableHighlight>

          {/* LEVEL 2 */}
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LEVEL_2)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Level 2</Text>
          </TouchableHighlight>

           {/* 3D DEMO Heart */}
           <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(HEART)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Heart</Text>
          </TouchableHighlight>

          {/* THEATRE */}
           <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(THEATRE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Theatre</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(levelSelect) {
    return () => {
      this.setState({
        levelSelect : levelSelect
      })
    }
  }

}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = Profile
