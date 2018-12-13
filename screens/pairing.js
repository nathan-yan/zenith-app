
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {BleManager} from 'react-native-ble-plx';

import base64 from 'base-64';

export default class Pairing extends Component {
  constructor(props){
    super(props);

    this.state = {
      log: "hi",
      status: "PAIRING " + this.props.device.name
    };

    this.notification;
  }

  render() {
    return <View style={{backgroundColor: "black", color: "white", flex: 1, flexDirection: "row", alignItems: "center", paddingLeft: 45}}>
           
              <View style = {{flexDirection: "column"}}>
                <Text style = {{fontFamily: "sofiapro-b", fontSize: 42, color: "white"}}>zenith</Text>
                <Text style = {{fontFamily: "vt323", fontSize: 30, color: "white", marginTop: -20}}>STATUS: {this.state.status}</Text>
                <Text style = {{color: "white"}}>{this.state.log}</Text>

                </View>

            
          </View>
  } 

  componentWillMount() {
    this.props.device.connect().then(
      
      (device) => {
        return device.discoverAllServicesAndCharacteristics();
      }).then(async (device) => {
        this.setState({
          log: "services"
        });

        let services = await device.services();
        let main_service = services[2];

        let characteristics = await device.characteristicsForService(main_service.uuid);
        let main_characteristic = characteristics[0];

        let res = await main_characteristic.writeWithoutResponse(base64.encode("hs_st"));

        this.setState({
          status: "SEND_HANDSHAKE"
        })

        this.notification = main_characteristic.monitor(
          (error, characteristic) => {
            if (error) {
              return;
            }

            if (characteristic != null) {
              this.setState({
                log: "received message " + base64.decode(characteristic.value)
              })

              if (base64.decode(characteristic.value) == "hs_resp"){}
                this.setState({
                  status: "RECV_HANDSHAKE"
                })


                this.props.done(this.notification, main_characteristic);

              }

            }
          
        )

      }).catch((error) => {
        console.log(error);
      });
  }
}   