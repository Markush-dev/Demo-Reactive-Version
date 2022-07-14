import { SET_SELFIE_PHOTO, SET_TIMER_TIME, SET_PROCESS_END } from "../ReduxTypes";

const initialState = {
  timer: 4,
  photo: null,
  processIsEnd: false
};

export function selfieReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TIMER_TIME:
      return { ...state, timer: action.payload };
    case SET_SELFIE_PHOTO:
      return { ...state, photo: action.payload };
    case SET_PROCESS_END:
      return { ...state, processIsEnd: action.payload };
    default:
      return state;
  }
}
