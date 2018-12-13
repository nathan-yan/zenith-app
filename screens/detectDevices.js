
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {BleManager} from 'react-native-ble-plx';
import BLEDeviceList from '../components/bleDeviceList.js';

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  //<BLEDeviceList manager = {this.props.manager}/>
  render() {
    return <View style={{backgroundColor: "black", color: "white", flex: 1, flexDirection: "column", paddingTop: 50, paddingLeft: 50}}>
      <Text style = {{fontSize: 42, fontFamily: "sofiapro-b", color: "white"}}>zenith</Text>
      <Text style = {{fontSize: 30, fontFamily: "vt323", color: "white", marginTop: -15, marginBottom: 10}}>STATUS: SCANNING</Text>
      
      <BLEDeviceList manager = {this.props.manager} connect = {this.props.connect}/>
    </View>
  } 
}   