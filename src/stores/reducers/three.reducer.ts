import { SET_GL_DOMELEMENT } from '../ReduxTypes'

const initialState = {
    glDomElement: null
}

export function threeReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_GL_DOMELEMENT: return { ...state, glDomElement: action.payload }
        default: return state;
    }
}