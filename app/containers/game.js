import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Button } from 'react-native';
import Board from '../components/board';
import Food from '../components/food';
import Score from '../components/score';
import Snake from "../components/snake";
import { NUM_COLUMNS, NUM_ROWS, INITIAL_DIRECTION } from '../constants/index';
import { setDirection, loseGame, incrementScore, prependSnake, newGame, setFood, moveSnake, setGameSpeed, showHelp } from '../actions/index';
import checkCollision from '../utils/index';


class Game extends Component {
    constructor(props) {
        super(props);
        this.resetGame = this.resetGame.bind(this);
        this.moveGame = this.moveGame.bind(this);
        this.onPressLeft = this.onPressLeft.bind(this);
        this.onPressRight = this.onPressRight.bind(this);
        this.onPressUp = this.onPressUp.bind(this);
        this.onPressDown = this.onPressDown.bind(this);
        this.onPressStart = this.onPressStart.bind(this);
    }

    componentWillMount() {
        this.generateNewFood();
    }

    componentDidUpdate() {
        this.checkFoodCapture();
        this.checkGameLoss();
    }

    checkGameLoss() {
        const snakeCoords = this.props.snake.coords;
        const snakeHeadCoords = snakeCoords[snakeCoords.length-1];

        if (!this.props.game.lost && (
            snakeHeadCoords[0] === -1 ||
            snakeHeadCoords[0] === NUM_COLUMNS ||
            snakeHeadCoords[1] === -1 ||
            snakeHeadCoords[1] === NUM_ROWS ||
            checkCollision(snakeHeadCoords, snakeCoords.slice(0, -1))))
        {
            this.props.loseGame();
        }
    }

    checkFoodCapture() {
        const snakeCoords = this.props.snake.coords;
        const snakeHeadCoords = snakeCoords[snakeCoords.length-1];
        const foodCoords = this.props.food;
        if(snakeHeadCoords[0] === foodCoords[0] && snakeHeadCoords[1] === foodCoords[1]) {
            this.generateNewFood();
            this.props.incrementScore();
            this.props.prependSnake(snakeCoords[snakeCoords.length-1].slice());
            this.props.setGameSpeed();
        }
    }

    resetGame() {
        this.props.newGame();
        this.generateNewFood();
        this.props.setDirection(INITIAL_DIRECTION);
    }

    generateNewFood() {
        const x = Math.floor(Math.random() * NUM_COLUMNS);
        const y = Math.floor(Math.random() * NUM_ROWS);
        if (checkCollision([x, y], this.props.snake.coords)) this.generateNewFood();
        else this.props.setFood([x, y]);

    }

    moveGame() {
        this.props.setDirection(this.props.snake.direction);
        this.props.moveSnake(this.props.snake);
        if (!this.props.game.lost) {
            setTimeout(this.moveGame, this.props.game.speed);
        }
    }

    onPressLeft() {
        const coords = this.props.snake.coords;
        const x = coords[coords.length-1][0];
        if (this.props.snake.direction !== 'right' && x !== 0)
        this.props.setDirection('left');
    }

    onPressRight() {
        const coords = this.props.snake.coords;
        const x = coords[coords.length-1][0];
        if (this.props.snake.direction !== 'left' && x !== NUM_COLUMNS - 1)
        this.props.setDirection('right');
    }

    onPressDown() {
        const coords = this.props.snake.coords;
        const y = coords[coords.length-1][1];
        if (this.props.snake.direction !== 'up' && y !== NUM_ROWS - 1)
        this.props.setDirection('down');
    }

    onPressUp() {
        const coords = this.props.snake.coords;
        const y = coords[coords.length-1][1];
        if (this.props.snake.direction !== 'down' && y !== 0)
        this.props.setDirection('up');
    }

    onPressStart() {
        if(this.props.game.lost) return false;
        setTimeout(this.moveGame, this.props.game.speed);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.score}>
                    <Score score={this.props.game.score}/>
                </View>

                <View style={styles.boardWrapper}>
                    <Board/>
                    <Snake coords={this.props.snake.coords} lost={this.props.game.lost}/>
                    <Food coords={this.props.food}/>
                </View>

                <View style={styles.buttonContainer}>
                    {!this.props.game.lost &&<Button
                        title="start"
                        onPress={this.onPressStart}
                    />}
                    {this.props.game.lost && <Button
                        title="reset"
                        onPress={this.resetGame}
                    />}
                </View>


                <View style={styles.buttonContainer}>
                    <Button
                        title="left"
                        onPress={this.onPressLeft}
                    />
                    <Button
                        title="right"
                        onPress={this.onPressRight}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="down"
                        onPress={this.onPressDown}
                    />
                    <Button
                        title="up"
                        onPress={this.onPressUp}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        snake: state.snake,
        game: state.game,
        food: state.food
    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({
            setDirection: setDirection,
            loseGame: loseGame,
            incrementScore: incrementScore,
            prependSnake: prependSnake,
            newGame: newGame,
            setFood: setFood,
            moveSnake: moveSnake,
            setGameSpeed: setGameSpeed,
            showHelp: showHelp
        },
        dispatch)
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center'
   },
    score: {
      alignSelf: 'center'
    },
    boardWrapper: {
        width: 400,
        height: 400,
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'relative'
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default connect(mapStateToProps, matchDispatchToProps)(Game);