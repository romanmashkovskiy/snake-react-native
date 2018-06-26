import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
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
    }

    componentWillMount() {
        this.setControls();
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

    setControls() {
        // document.addEventListener('keydown',e => {
        //     const coords = this.props.snake.coords;
        //     const x = coords[coords.length-1][0];
        //     const y = coords[coords.length-1][1];
        //
        //
        //     switch (e.code) {
        //         case "KeyA":
        //         case 'ArrowLeft':
        //         {
        //             if (this.props.snake.direction !== 'right' && x !== 0)
        //                 this.props.setDirection('left');
        //             break;
        //         }
        //         case "KeyD":
        //         case 'ArrowRight':
        //         {
        //             if (this.props.snake.direction !== 'left' && x !== NUM_COLUMNS - 1)
        //                 this.props.setDirection('right');
        //             break;
        //         }
        //         case "KeyS":
        //         case 'ArrowDown':
        //         {
        //             if (this.props.snake.direction !== 'up' && y !== NUM_ROWS - 1)
        //                 this.props.setDirection('down');
        //             break;
        //         }
        //         case "KeyW":
        //         case 'ArrowUp':
        //         {
        //             if (this.props.snake.direction !== 'down' && y !== 0)
        //                 this.props.setDirection('up');
        //             break;
        //         }
        //         case 'Space':
        //         {
        //             if(this.props.game.lost) return false;
        //             setTimeout(this.moveGame, this.props.game.speed);
        //             break;
        //         }
        //         case 'F1':
        //         {
        //             e.preventDefault();
        //             this.props.showHelp(true);
        //             break;
        //         }
        //         case 'Escape':
        //         {
        //             this.props.showHelp(false);
        //             break;
        //         }
        //     }
        // })
    }

    render() {
        return (

                <View style={styles.boardWrapper}>
                    <Board/>

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
    boardWrapper: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    }
});

export default connect(mapStateToProps, matchDispatchToProps)(Game);