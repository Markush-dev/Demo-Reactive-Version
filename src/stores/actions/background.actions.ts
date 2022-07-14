import { SET_Background_Photo_Model, SET_Background_Photo } from "../ReduxTypes";


export function changeBackground(url: string) {
    return {
        type: SET_Background_Photo_Model,
        payload: url
    }
} 