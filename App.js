/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {BleManager} from 'react-native-ble-plx';

import Splash from './screens/splash.js';
import DetectDevices from './screens/detectDevices.js';
import Pairing from './screens/pairing.js';
import Dashboard from './screens/dashboard.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.ble = new BleManager();

    this.state = {
      currentScreen: <DetectDevices manager = {this.ble} connect = {this.connectDevice}/>,
      device: null
    }
  }

  connectDevice = (device) => {
    this.showPairing(device);
  }

  showPairing = (device) => {
    this.setState({
      device: device,
      currentScreen: <Pairing done = {this.onPair} manager = {this.ble} device = {device}/>
    })
  }

  onPair = (notification, characteristic) => {
    this.setState({
      currentScreen: <Dashboard manager = {this.ble} device = {this.state.device} characteristic = {characteristic}/>
    })

    notification.remove();

  }

  showSplash(){

  }
  
  componentWillUnmount() {
    notification.remove();
  }

  render() {
    return this.state.currentScreen;
  }
}