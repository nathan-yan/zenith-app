
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class BLEDevice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
   return <View style = {{marginBottom: 15}}>
      <Text style = {{ color: "white", fontFamily: "vt323", fontSize: 30}} onPress = {() => {this.props.connect(this.props.device)}}>{this.props.device.name}</Text>
      <Text style = {{ color: "white", fontFamily: "vt323", fontSize: 20, marginTop: -5}}>{this.props.device.id}</Text>
      <Text style = {{ color: "#02ce84", fontFamily: "vt323", fontSize: 20, marginTop: -5}}>CONNECT</Text>
    </View>
  }
}

