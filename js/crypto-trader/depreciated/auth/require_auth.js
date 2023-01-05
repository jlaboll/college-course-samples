import {GET_USER, GET_WALLET, SIGN_IN, SIGN_OUT} from '../actions/types'
import {combineReducers} from 'redux'

const initialState =
    {
        user_id: -1,
        wallet_id: -1
    }


function profile(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return state.user_id = action.user_id
        case SIGN_OUT:
            state = initialState
            break
        case GET_USER:
            return state.user_id
        case GET_WALLET:
            return state.wallet_id
        default:
            return state
    }
}

const reducer = combineReducers({profile})

export default reducer