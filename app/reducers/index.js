import {combineReducers} from 'redux';
import snakeReducer from './snake';
import gameReducer from './game';
import foodReducer from './food';


const rootReducer = combineReducers({
    snake: snakeReducer,
    game: gameReducer,
    food: foodReducer
});

export default rootReducer;