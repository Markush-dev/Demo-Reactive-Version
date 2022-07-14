import { combineReducers } from "redux";
import { videocamReducer } from './reducers/videocam.reducer'
import { threeReducer } from './reducers/three.reducer'
import { selfieReducer } from './reducers/selfie.reducer'
import { backgroundReducer } from './reducers/background.reducer'
import { stickerReducer } from "./reducers/sticker.reducer";

export const rootReducer = combineReducers({
    videocam: videocamReducer,
    three: threeReducer,
    selfie: selfieReducer,
    background: backgroundReducer,
    sticker:stickerReducer
});