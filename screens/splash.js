
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {BleManager} from 'react-native-ble-plx';

export default class Splash extends Component {
  render() {
    return <View style={{backgroundColor: "black", color: "white", flex: 1, flexDirection: "row"}}>
            <View style = {{flex: 1}}/>
            <View style = {{flexDirection: "row", alignItems: "center"}}>
              <View style = {{flexDirection: "column"}}>
                <Text style = {{fontFamily: "sofiapro-b", fontSize: 70, color: "white"}}>zenith</Text>
                <Text style = {{fontFamily: "vt323", fontSize: 30, color: "white", marginTop: -20}}>by ARC</Text>
              </View>
            </View>
            <View style = {{flex: 1}}/>
            
          </View>
  } 
}   