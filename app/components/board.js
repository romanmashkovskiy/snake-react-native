import React, {Component} from 'react';
import { NUM_ROWS, NUM_COLUMNS } from '../constants';
import { StyleSheet, View } from 'react-native';



export default class Board extends Component {
    render() {

        let board = [];
        for (let x = 0; x < NUM_ROWS; x++) {
            board[x] = [];
            for (let y = 0; y < NUM_COLUMNS; y++) {
                board[x][y] = '';
            }
        }

        return (

            <View style={styles.board}>
                {
                    board.map((row, rowIndex) => {
                        return (
                            <View style={styles.row} key={rowIndex}>
                                {
                                    row.map((cell, cellIndex) => <View style={styles.cell} key={cellIndex} />)
                                }
                            </View>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    board: {
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    row: {
        height: 15,
        width: 300,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cell: {
        width: 15,
        height: 15,
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: 'black'
    }
});