import {  SET_Sticker_Model } from "../ReduxTypes";

const initialState = { 
  url: null
};

export function stickerReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_Sticker_Model:
      return { ...state, url: action.payload };
      
      
    default:
      return state;
  }
}
