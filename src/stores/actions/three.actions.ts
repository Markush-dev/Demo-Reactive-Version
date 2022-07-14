import { SET_GL_DOMELEMENT } from "../ReduxTypes"


export function setGlDomElement(element: any) {
    return {
        type: SET_GL_DOMELEMENT,
        payload: element
    }
}