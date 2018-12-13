
import React, {Component} from 'react';
import { Image, PanResponder, Animated, Switch, ViewPagerAndroid, StyleSheet, Text, View, ScrollView, Alert, Button, Slider, TouchableNativeFeedback, TextInput } from 'react-native';

import {BleManager} from 'react-native-ble-plx';

import MenuHeader from '../components/menuHeader.js';

import base64 from 'base-64';

export default class Pairing extends Component {
  constructor(props){
    super(props);

    this.state = {
      touchDownX: 0,
      relX: 0,
      pageProgress: new Animated.Value(0),
      page: 0,
  }

    this._val = 0;
    this.onSwipe = Animated.event([{
        nativeEvent: {
            offset: {
                x: this.state.pageProgress
            }
        }
  }])

    this.notification;

  }

  handleTransform = () => {
    return {
        transform: [
            {
                translateX: this.state.pageProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                })
            }
        ]
    }
}


  render() {
    return <View style = {{flex: 1, backgroundColor: "black", color: "white", paddingTop: 50}}>
    <Text style = {{fontFamily: "sofiapro-b", fontSize: 42, color: "white", marginLeft: 50}}>zenith</Text>

    <MenuHeader pages = {
      [
          {
              "page" : "HOME",
          },
          {
              "page" : "TEST"
          },
          {
              "page" : "TVC"
          },
          {
              "page" : "SETTINGS"
          }
      ]
} currentPage = {this.state.page} transform = {this.handleTransform}/> 
    <ViewPagerAndroid style = {{
      width: "100%",
      height: "100%",
      flex: 1
  }} onPageScroll = {(event) => {
      let offset = event.nativeEvent.offset;
      this.state.pageProgress.setValue(event.nativeEvent.position + offset)
  }} onPageSelected = {(event) => {
      this.setState({
          page: event.nativeEvent.position
      })
  }}>

      <View style = {{paddingLeft: 50, marginTop: 20}} key = '1'>
         
          <View style = {{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              marginLeft: this.state.pageProgress._value
          }}>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 30}}>GYRO</Text>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25}}>X: {this.state.gx} (deg/s)</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>Y: {this.state.gy}</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>Z: {this.state.gz}</Text>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 30}}>ACCELEROMETER</Text>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25}}>X: {this.state.ax} (m/s)</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>Y: {this.state.ay}</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>Z: {this.state.az}</Text>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 30}}>YAW-PITCH-ROLL</Text>

          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25}}>Y: {this.state.oy} (deg)</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>P: {this.state.op}</Text>
          <Text style = {{color: "white", fontFamily: "vt323", fontSize: 25, marginTop: -5}}>R: {this.state.or}</Text>
          
          </View>
          
      </View>

      <View style = {{}} key = '2'>
          <View style = {{marginTop: 30, padding: 30, width: "90%"}} id = "notifications">
              <Text style = {{fontSize: 30, fontFamily: "sofia pro", marginBottom: 0, color: "black"}}>Notifications</Text>
              <Text style = {{fontSize: 13, fontFamily: "sofia pro", marginBottom: 15, color: "#ccc"}}>Get notifications for recent assignments or if certain grades drop below a certain percentage.</Text>

              <View style = {{flexDirection: "row", marginBottom: 10}}>
                  <Switch />
                  <Text style = {{fontSize: 20, fontFamily: "sofia pro",color: "black"}}>Enable notifications by email</Text>
              </View>

              <View style = {{flexDirection: "row", marginBottom: 10}}>
                  <Switch />
                  <Text style = {{fontSize: 20, fontFamily: "sofia pro",color: "black"}}>Enable notifications by SMS</Text>
              </View>

              <Slider style = {{width: "100%"}} minimumValue = {0} maximumValue = {100}/>
              
              <View style = {{flexDirection: "row", marginBottom: 10}}>
                  <Text style = {{fontSize: 20, fontFamily: "sofia pro",color: "black"}}>Grade alert threshold</Text>
              </View>

          </View>

          
          
      </View>

       <View style = {{}} key = '3'>
          <View style = {{marginTop: 20}}>
          </View>

          
          
      </View>

      <View style = {{}} key = '4'>
          <View style = {{marginTop: 20}}>
          </View>

          
          
      </View>
</ViewPagerAndroid>
</View>
  } 

  componentDidMount() {
    this.notification = this.props.characteristic.monitor((error, characteristic) => {
      if (error) {

      }

      if (characteristic != null) {
        this.setState({
   //       value: "Value: " + base64.decode(characteristic.value)
        })

        let val = base64.decode(characteristic.value);
        // let x1 = val[1].charCodeAt(0);
        // let x2 = val[2].charCodeAt(0);

        if (val[0] == 'g'){
          try{
              let sign = val[1].charCodeAt(0);
              let x1 = val[2].charCodeAt(0);
              let x2 = val[3].charCodeAt(0);
              let x = (x1 * 256 + x2 - 257) / 10.;

              if (sign == 2){
                x *= -1
              }

            this.setState({
              gx: fixedLengthFloat(x, 5)
            })

            sign = val[4].charCodeAt(0);
            x1 = val[5].charCodeAt(0);
            x2 = val[6].charCodeAt(0);
            x = (x1 * 256 + x2 - 257) / 10.;

              if (sign == 2){
                x *= -1
              }

            this.setState({
              gy: fixedLengthFloat(x, 5)
            })

            sign = val[7].charCodeAt(0);
            x1 = val[8].charCodeAt(0);
            x2 = val[9].charCodeAt(0);
            x = (x1 * 256 + x2 - 257) / 10.;

              if (sign == 2){
                x *= -1
              }

            this.setState({
              gz: fixedLengthFloat(x, 5)
            })
          }catch(error){
            
          }
        }else if (val[0] == 'a'){
          try{
            let sign = val[1].charCodeAt(0);
            let x1 = val[2].charCodeAt(0);
            let x2 = val[3].charCodeAt(0);
            let x = (x1 * 256 + x2 - 257) / 10.;

            if (sign == 2){
              x *= -1
            }

          this.setState({
            ax: fixedLengthFloat(x, 5)
          })

          sign = val[4].charCodeAt(0);
          x1 = val[5].charCodeAt(0);
          x2 = val[6].charCodeAt(0);
          x = (x1 * 256 + x2 - 257) / 10.;

            if (sign == 2){
              x *= -1
            }

          this.setState({
            ay: fixedLengthFloat(x, 5)
          })

          sign = val[7].charCodeAt(0);
          x1 = val[8].charCodeAt(0);
          x2 = val[9].charCodeAt(0);
          x = (x1 * 256 + x2 - 257) / 10.;

            if (sign == 2){
              x *= -1
            }

          this.setState({
            az: fixedLengthFloat(x, 5)
          })
        }catch(error){
          
        }
      }else if (val[0] == 'o'){
        try{
          let sign = val[1].charCodeAt(0);
          let x1 = val[2].charCodeAt(0);
          let x2 = val[3].charCodeAt(0);
          let x = (x1 * 256 + x2 - 257) / 10.;

          if (sign == 2){
            x *= -1
          }

        this.setState({
          oy: fixedLengthFloat(x, 5)
        })

        sign = val[4].charCodeAt(0);
        x1 = val[5].charCodeAt(0);
        x2 = val[6].charCodeAt(0);
        x = (x1 * 256 + x2 - 257) / 10.;

          if (sign == 2){
            x *= -1
          }

        this.setState({
          op: fixedLengthFloat(x, 5)
        })

        sign = val[7].charCodeAt(0);
        x1 = val[8].charCodeAt(0);
        x2 = val[9].charCodeAt(0);
        x = (x1 * 256 + x2 - 257) / 10.;

          if (sign == 2){
            x *= -1
          }

        this.setState({
          or: fixedLengthFloat(x, 5)
        })
      }catch(error){
        
      }
      }
    }
  })
  
  }

}   

function fixedLengthFloat(f, length){
  let res = f;
  
  if (f >= 0){
    res = ' ' + f;
  }

  if (f == 0){
    res += '.';
  }

  for (var i = 0; i < (length - res.length); i++){
    res += '0'
  }

  return res
}