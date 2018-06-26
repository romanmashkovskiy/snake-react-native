import * as actions from '../actions/action-types';

const INITIAL_STATE = [];

export default function foodReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.SET_FOOD:
            return action.food;
        case actions.NEW_GAME:
            return INITIAL_STATE;
        default:
            return state;
    }
}