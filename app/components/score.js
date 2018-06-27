import React, {Component} from 'react';
import {SQUARE_SIZE} from "../constants";
import { View, Text } from "react-native";


export default class Score extends Component {

    render() {

        return (
            <View>
                <Text>
                    SCORE: {this.props.score}
                </Text>
            </View>
        );
    }
}