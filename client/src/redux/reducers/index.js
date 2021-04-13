import {combineReducers} from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

const reducers = combineReducers({
    authReducer,cartReducer
})

export default reducers