import { SET_FRAME, SET_GLASSES_MODEL, SET_SHOW_FRAME, SET_SHOW_GLASSES } from "../ReduxTypes";

export function setGlassesModel(model: any) {
  return {
    type: SET_GLASSES_MODEL,
    payload: model,
  };
}

export function setFrame(frame: any) {
  return {
    type: SET_FRAME,
    payload: frame,
  };
}

export function setShowGlasses(show: boolean) {
  return {
    type: SET_SHOW_GLASSES,
    payload: show,
  };
}

export function setShowFrame(show: boolean) {
  return {
    type: SET_SHOW_FRAME,
    payload: show,
  };
}
