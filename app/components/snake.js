import React, {Component} from 'react';
import { SQUARE_SIZE } from '../constants/index';
import {StyleSheet, View} from "react-native";

export default class Snake extends Component {

    render() {
        const styles = StyleSheet.create({
            food: {
                left: coords[0] * SQUARE_SIZE + 'px',
                top: coords[1] * SQUARE_SIZE + 'px',
                background: this.props.lost ? 'red' : '#333',
                width: 20,
                height: 20,
                position: 'absolute'
            }
        });
        return (

            <div>
                {
                    this.props.coords.map((coords, index) => {
                        return <View style={style} key={index} />
                    })
                }
            </div>
        );
    }
}


