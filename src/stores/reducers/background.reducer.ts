import { SET_Background_Photo_Model, SET_Background_Photo } from "../ReduxTypes";

const initialState = { 
  url: null
};

export function backgroundReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_Background_Photo_Model:
      return { ...state, url: action.payload };
    case SET_Background_Photo:
      return { ...state, url: null };
     
    default:
      return state;
  }
}
