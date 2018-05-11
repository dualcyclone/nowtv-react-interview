import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export function reducer(state, action = {}) {
    let newState = state

    if (action.type === 'MESSAGES_LOADING_FULFILLED') {
        newState = Object.assign({}, state, {
            messages: action.payload
        })
    }

    if (action.type === 'MEMBERS_LOADING_FULFILLED') {
        newState = Object.assign({}, state, {
            members: action.payload
        })
    }

    return newState
}

export const store = createStore(reducer, {}, applyMiddleware(
    promiseMiddleware()
))
