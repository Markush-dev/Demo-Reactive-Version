import { 
    SET_Sticker_Model 
} from "../ReduxTypes";

export function addStickerToBackground(url: string) {
    return {
        type: SET_Sticker_Model,
        payload: url
    }

    
} 