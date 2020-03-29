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
  TextInput,
} from 'react-native';
import { styles } from "../../style";

import io from "socket.io-client";

export default class Chat extends Component {
  constructor(props) {
   
    super(props);
    this.state = {
       chatMessage: "",
       chatMessages: [],
       levelSelect : "",
    };
 
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
  }


  componentDidMount(){
    this.socket = io("https://covid-19.kderbyma.com:3000");
    this.socket.on("chat message", msg => {
          this.setState({ chatMessages: [...this.state.chatMessages, msg]   
     });
  });
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
      return this._getExperienceSelector();
  }

  submitChatMessage() {
    console.log("Sending...",this.state.chatMessage);
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
    ));

    console.log(this.state.chatMessages)
    return (
      <View style={styles.container}>
        {chatMessages}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 600}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
      </View>);
  }
}

module.exports = Chat
