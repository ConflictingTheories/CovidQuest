'use strict';

import React, { Component } from 'react';
import {View} from 'react-native';

import {StyleSheet} from 'react-native';

import Targets from '../../../assets/Targets';
import TargetCard from './SpyTargetCard';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad
} from 'react-viro';

export class BusinessCard extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }

  getARScene() {
    return (
      <ViroNode>
        {/* // Cards */}
        <TargetCard target="buttonEntry" clue={{hintText:"Figure out the Button Sequence....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="passwordEntry" clue={{hintText:"Figure out the Password....", requires: [],onFound: ()=>console.log('Found')}}/>
        {/* // Locks */}
        <TargetCard target="redLock" clue={{hintText:"Find the Red Key....", requires: ["redKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blueLock" clue={{hintText:"Find the Blue Key....", requires: ["blueKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="greenLock" clue={{hintText:"Find the Green Key....", requires: ["greenKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="orangeLock" clue={{hintText:"Find the Orange Key....", requires: ["orangeKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="purpleLock" clue={{hintText:"Find the Purple Key....", requires: ["purpleKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blackLock" clue={{hintText:"Find the Black Key....", requires: ["blackKey"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="whiteLock" clue={{hintText:"Find the White Key....", requires: ["whiteKey"],onFound: ()=>console.log('Found')}}/>
        {/* // Keys */}
        <TargetCard target="redKey" clue={{hintText:"You found a Red Key....", requires: [], onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blueKey" clue={{hintText:"You found a Red Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="greenKey" clue={{hintText:"You found a Red Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="orangeKey" clue={{hintText:"You found a Red Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="purpleKey" clue={{hintText:"You found a Purple Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blackKey" clue={{hintText:"You found a Black Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="whiteKey" clue={{hintText:"You found a White Key....", requires: [],onFound: ()=>console.log('Found')}}/>
        {/* // Flags */}
        <TargetCard target="redFlag" clue={{hintText:"Congratulations - You won the Red Flag!", requires: ["redLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blueFlag" clue={{hintText:"Congratulations - You won the Blue Flag!", requires: ["blueLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="greenFlag" clue={{hintText:"Congratulations - You won the Green Flag!", requires: ["greenLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="orangeFlag" clue={{hintText:"Congratulations - You won the Orange Flag!", requires: ["orangeLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="purpleFlag" clue={{hintText:"Congratulations - You won the Purple Flag!", requires: ["purpleLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="blackFlag" clue={{hintText:"Congratulations - You won the Black Flag!", requires: ["blackLock"],onFound: ()=>console.log('Found')}}/>
        <TargetCard target="whiteFlag" clue={{hintText:"Congratulations - You won the White Flag!", requires: ["whiteLock"],onFound: ()=>console.log('Found')}}/>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

// TARGET REGISTRATION
ViroARTrackingTargets.createTargets({
  // CARDS
  "buttonEntry" : {
    source : Targets.cards.buttonEntry,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "passwordEntry" : {
    source : Targets.cards.passwordEntry,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  // FLAGS
  "redFlag" : {
    source : Targets.flags.red,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blueFlag" : {
    source : Targets.flags.blue,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "greenFlag" : {
    source : Targets.flags.green,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "orangeFlag" : {
    source : Targets.flags.orange,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "purpleFlag" : {
    source : Targets.flags.purple,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blackFlag" : {
    source : Targets.flags.black,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "whiteFlag" : {
    source : Targets.flags.white,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  // LOCKS
  "redLock" : {
    source : Targets.locks.red,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blueLock" : {
    source : Targets.locks.blue,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "greenLock" : {
    source : Targets.locks.green,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "orangeLock" : {
    source : Targets.locks.orange,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "purpleLock" : {
    source : Targets.locks.purple,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blackLock" : {
    source : Targets.locks.black,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "whiteLock" : {
    source : Targets.locks.white,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  // KEYS
  "redKey" : {
    source : Targets.keys.red,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blueKey" : {
    source : Targets.keys.blue,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "greenKey" : {
    source : Targets.keys.green,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "orangeKey" : {
    source : Targets.keys.orange,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "purpleKey" : {
    source : Targets.keys.purple,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "blackKey" : {
    source : Targets.keys.black,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
  "whiteKey" : {
    source : Targets.keys.white,
    orientation : "Up",
    physicalWidth : 0.2286 // real world width in meters
  },
});

module.exports = BusinessCard;
