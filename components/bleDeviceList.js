// epics gamers yeuh
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Device from './bleDevice.js';

export default class BLEDeviceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      log: "hi"
    }
  
    this.subscription;
  }
  // yeuh
  render() {
    return (
      <View style = {{}}>
        {this.state.devices.map((device, i) => {
          return <Device device = {device} key = {i} connect = {this.props.connect}/>
        })}
        <Text style = {{ color: "white"}}>{this.state.log}</Text>
      </View>
    );
  }

  scanDevices() {
    this.props.manager.startDeviceScan(null, null, (error, device) => {
      
      let included = false;
      for (let d of this.state.devices){
        if (d.name === device.name){
          included = true;
        }
      }

      if (!included){
        this.state.devices.push(device);
        this.setState({
          devices: this.state.devices,
          log: device.name
        })
      }
    })
  }

  componentWillMount() {
    this.subscription = this.props.manager.onStateChange((state) => {
      if (state == 'PoweredOn'){
        this.setState({
          log: "beginning scan"
        })
        this.scanDevices();
        subscription.remove();
      }
    }, true)
  }

  componentWillUnmount(){
    this.subscription.remove();
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
    color: "white",
    flex: 1
  }
});
