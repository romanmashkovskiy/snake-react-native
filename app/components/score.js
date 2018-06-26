import React, {Component} from 'react';
import {SQUARE_SIZE} from "../constants";
import {StyleSheet} from "react-native";


export default class Score extends Component {

    render() {

        return (
            <View>
                {this.props.score}
            </View>
        );
    }
}