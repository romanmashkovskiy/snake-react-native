import React, {Component} from 'react';
import { SQUARE_SIZE } from '../constants/index';
import {StyleSheet, View} from "react-native";

export default class Snake extends Component {

    render() {
        const styles = StyleSheet.create({
            snakeContainer: {
                position: 'absolute'
            }
        });
        return (
            <View style = {styles.snakeContainer}>
                {
                    this.props.coords.map((coords, index) => {
                        const styles = StyleSheet.create({
                            snake: {
                                left: coords[0] * SQUARE_SIZE,
                                top: coords[1] * SQUARE_SIZE,
                                backgroundColor: this.props.lost ? 'red' : '#333',
                                width: 15,
                                height: 15,
                                position: 'absolute'
                            }
                        });
                        return <View style={styles.snake} key={index} />
                    })
                }
            </View>
        );
    }
}


