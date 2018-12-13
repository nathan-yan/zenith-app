import React from 'react';
import { Image, StyleSheet, Text, Animated, View, Alert, Button, TouchableNativeFeedback, TextInput } from 'react-native';

export default class MenuHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: props.pages[0]
        }
    }

    render() {
        return <View style = {{
            flexDirection: "column",
            marginBottom: -60,
            marginTop: -20,
            paddingTop: 10,
            paddingBottom: 40,
            width: "100%",
            height: 130,
            zIndex: 100000
    }} >
        <Animated.View style = {[{
            width: "200%",
            height: "100%",
            
        }, this.props.transform()]}>
                {this.props.pages.map((page, i) => {
                    let color;
                    
                    if (i === this.props.currentPage){
                        color = 'white'    
                    }else{
                        color = '#444'
                    }
                    
                    return <Text key = {i} style = {{
                        fontSize: 30,
                        color: color,
                        position: "absolute",
                        top: 0,
                        left: ((i) * 100) + 50,
                        fontFamily: "vt323"
                    }}>{page.page}</Text>
                })}
            </Animated.View>
        </View>
    }
} 