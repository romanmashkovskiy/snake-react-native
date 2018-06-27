import * as actions from '../actions/action-types';
import { INITIAL_GAME_SPEED } from '../constants/index';

const INITIAL_STATE = {
    speed: INITIAL_GAME_SPEED,
    lost: false,
    score: 0
};

export default function gameReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.LOSE_GAME:
            return {
                ...state,
                lost: true
            };
        case actions.NEW_GAME:
            return {
                ...state,
                speed: INITIAL_GAME_SPEED,
                lost: false,
                score: 0,
                help: false
            };
        case actions.INCREMENT_SCORE:
            return {
                ...state,
                score: state.score + 1
            };
        case actions.INCREASE_SPEED:
            return {
                ...state,
                speed: Math.round(INITIAL_GAME_SPEED/(INITIAL_GAME_SPEED + 100*state.score) * INITIAL_GAME_SPEED)
            };
        default: return state;
    }
}