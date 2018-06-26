import * as actions from '../actions/action-types';
import { INITIAL_DIRECTION, NUM_COLUMNS } from '../constants/index';

const INITIAL_STATE = {
    direction: INITIAL_DIRECTION,
    coords: [
        [Math.floor(NUM_COLUMNS/2), 0],
        [Math.floor(NUM_COLUMNS)/2, 1],
        [Math.floor(NUM_COLUMNS/2), 2]
    ]
};

export default function snakeReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.MOVE_SNAKE:
            return {
                ...state,
                coords: action.coords
            };
        case actions.SET_DIRECTION:
            return {
                ...state,
                direction: action.direction
            };
        case actions.PREPEND_SNAKE:
            return {
                ...state,
                coords: [[action.coords], ...state.coords]
            };
        case actions.NEW_GAME:
            return INITIAL_STATE;
        default:
            return state;
    }
}