import React, {Component} from 'react';
import { SQUARE_SIZE } from '../constants';
import {StyleSheet, View} from "react-native";



export default class Food extends Component {

    render() {
        const styles = StyleSheet.create({
            food: {
                left: this.props.coords[0] * SQUARE_SIZE,
                top: this.props.coords[1] * SQUARE_SIZE,
                width: 20,
                height: 20,
                background: 'green',
                position: 'absolute'
            }
        });
        return (
            <View style={styles.food}></View>
        );
    }
}

