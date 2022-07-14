import { SET_SELFIE_PHOTO, SET_TIMER_TIME, SET_PROCESS_END } from "../ReduxTypes";


export function setTimerTime(time: number) {
    return {
        type: SET_TIMER_TIME,
        payload: time
    }
}

export function setProcessEnd(isEnd: boolean) {
    return {
        type: SET_PROCESS_END,
        payload: isEnd
    }
}

export function refreshTimer() {
    return {
        type: SET_TIMER_TIME,
        payload: null
    }
}

export function setSelfiePhoto(photo: any) {
    return {
        type: SET_SELFIE_PHOTO,
        payload: photo
    }
}