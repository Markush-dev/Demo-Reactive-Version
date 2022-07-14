// @ts-nocheck
import { SET_FRAME, SET_GLASSES_MODEL, SET_GRAPH_DATA, SET_PIE_DATA, SET_SHOW_FRAME, SET_SHOW_GLASSES } from '../ReduxTypes'
import DealWithItGlasses from '../../assets/Glasses/Deal_With_It.glb'
import DealWithItGlasses2 from '../../assets/Glasses/glasses2.glb'
// import BeesFrame from '../../assets/Frames/Bees.png'

const initialState = {
    glassesModel: DealWithItGlasses2,
    frame: null,
    showGlasses: true,
    showFrame: true
}

export function videocamReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_GLASSES_MODEL: return { ...state, glassesModel: action.payload }
        case SET_FRAME: return { ...state, frame: action.payload }
        case SET_SHOW_GLASSES: return { ...state, showGlasses: action.payload }
        case SET_SHOW_FRAME: return { ...state, showFrame: action.payload }
        default: return state;
    }
}