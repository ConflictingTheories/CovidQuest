'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import Targets from '../../../assets/Targets';

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
  ViroUtils,
  ViroNode,
  Viro3DObject,
  ViroQuad
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var monorailInfoCard = require('./res/infocard_monorail.png');
var statueWindowCard = require('./res/infocard_statue.png');
var slutWindowCard = require('./res/infocard_slut.png');
var backImage = require('./res/icon_back.png');

/**
 * Grab our created custom controls used within this scene.
 */
var LoadingSpinner = require('./custom_controls/LoadingSpinner');
var InfoElement = require('./custom_controls/InfoElement');


export class TargetCard extends Component {

    constructor(props){
      super(props)
      this.state = {
            isTracking: false,
            initialized: false,
            runAnimation: false,
            target: props.target,
            clue: props.clue,
            hintText:props.clue.hintText || '',
            requires: props.clue.requires || [],
            onlound: ()=>props.clue.onFound() || console.log('---...---'),
        }
        this.onlound = props.clue.onFound
        this.getTargetCard = this.getTargetCard.bind(this)
        console.log("CONSTRUCTION FINISHED")
    }

    // Generate Target Card Information
  getTargetCard() {
    console.log("RETURNING CARD----")
    return (
      <ViroNode>
        <InfoElement content={slutWindowCard} contentCardScale={[3.67,4,1]} position={polarToCartesian([-5, 0, 0])}/>
        <InfoElement content={monorailInfoCard} contentCardScale={[3.67,4,1]} position={polarToCartesian([-5, 77, -10])}/>
        <InfoElement content={statueWindowCard} contentCardScale={[4,3.95,2]} position={polarToCartesian([-5, 277, 0])}/>
        <ViroARImageMarker target={this.state.target}
          onAnchorFound={
            () => this.setState({
                runAnimation: true
            })}
        >
          <ViroNode key={`card-${this.state.target}`}>
            <ViroNode
              opacity={0} position={[0, -0.02, 0]}
              animation={{
                name:'animateImage',
                run: this.state.runAnimation
                }}
            >
              <ViroFlexView
                  rotation={[-90, 0, 0]}
                  height={0.03}
                  width={0.05}
                  style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >
                  <ViroImage
                    height={0.015}
                    width={0.015}
                    style={styles.image}
                    source={require('./res/avatar.png')}
                  />
                  <ViroText
                    textClipMode="None"
                    text="CovidQuest"
                    scale={[.015, .015, .015]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
                <ViroFlexView
                  onTouch={() => this.onlound()}
                  style={styles.subText}
                >
                  <ViroText
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text={this.state.target}
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />
                  <ViroAnimatedImage
                    height={0.01}
                    width={0.01}
                    loop={true}
                    source={require('./res/test.png')}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0} position={[0, 0, 0]}
              animation={{
                name:'animateViro',
                run: this.state.runAnimation
              }}
            >
              <ViroText text={this.state.hintText}
                rotation={[-90, 0, 0]}
                scale={[.05, .05, .05]}
                style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    console.log('-')
    return this.getTargetCard();
  }

}
// STYLESHEET
var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  }
});
// MATERIALS
ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});
// ANIMATIONS
ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce",
    duration: 500
  }
});

module.exports = TargetCard;
