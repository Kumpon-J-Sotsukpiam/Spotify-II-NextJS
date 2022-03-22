import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: 'currentTrackIdStats',
    default: null
})
export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false
})