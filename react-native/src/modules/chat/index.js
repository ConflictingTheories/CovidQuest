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

import { GiftedChat } from 'react-native-gifted-chat'

import DeviceInfo from 'react-native-device-info';

import io from "socket.io-client";

export default class Chat extends Component {
  constructor(props) {

    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      deviceId: '',
      userId: 0,
      messageId: 0,
      name: '',
      avatar: 'https://covid-19.kderbyma.com/images/bioalpha.png'
    };

    this._getExperienceSelector = this._displayChat.bind(this);
  }


  componentDidMount() {
    this.setState({
      chatMessages: [
        {
          _id: 1,
          text: 'Hello Citizen - Welcome to CovidQuest. Please make yourself at home. Some other may be on here.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Covid Quest',
            avatar: 'https://covid-19.kderbyma.com/images/bioalpha.png',
          },
        },
      ],
      deviceId: DeviceInfo.getUniqueId(),
      userId: Math.round(Math.random() * 100000000 % 100000000)
    })

    this.socket = io("http://covid-19.kderbyma.com:3000");
    this.socket.on("chat message", msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      });
    });
  }

  onSend(messages = []) {
    messages.map((x) => {
      console.log("Sending...", x);
      this.socket.emit('chat message', x);
    });

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return this._displayChat();
  }

  _displayChat() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
    ));

    return (
      <GiftedChat
        messages={this.state.chatMessages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.userId,
        }}
      />);
  }
}

var localStyles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
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

module.exports = Chat
