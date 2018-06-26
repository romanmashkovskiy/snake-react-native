import * as actions from './action-types';

export const setDirection = (direction) => {
    return {
        type: actions.SET_DIRECTION,
        direction: direction
    }
};

export function moveSnake(snake) {
    const direction = snake.direction;
    let coords = snake.coords.slice();
    const headCoords = coords[coords.length-1];
    const headMap = {
        down: [headCoords[0], headCoords[1]+1],
        up: [headCoords[0], headCoords[1]-1],
        left: [headCoords[0]-1, headCoords[1]],
        right: [headCoords[0]+1, headCoords[1]]
    };
    coords.push(headMap[direction]);
    coords.shift();

    return {
        type: actions.MOVE_SNAKE,
        coords
    }
}

export function setFood(coords) {
    return {
        type: actions.SET_FOOD,
        food: coords
    }
}

export function prependSnake(coords) {
    return {
        type: actions.PREPEND_SNAKE,
        coords: coords
    }
}

export function newGame() {
    return {
        type: actions.NEW_GAME
    }
}

export function loseGame() {
    return {
        type: actions.LOSE_GAME
    }
}

export function incrementScore() {
    return {
        type: actions.INCREMENT_SCORE
    }
}

export function setGameSpeed() {
    return {
        type: actions.INCREASE_SPEED
    }
}

export function showHelp(status) {
    return {
        type: actions.SHOW_HELP,
        payload: status
    }
}