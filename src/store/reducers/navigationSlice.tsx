import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface NavigationSlice {
    stopObserver: boolean
    linkUsed: boolean
    currentSection: string
    previousSection: string
}

const initialState: NavigationSlice = {
    stopObserver: false,
    linkUsed: false,
    currentSection: '',
    previousSection: ''
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentSection(state, action: PayloadAction<string>) {
            if (state.linkUsed && !state.stopObserver) {
                state.linkUsed = false
            } else {
                state.previousSection = state.currentSection
                state.currentSection = action.payload
            }
        },
        setStopIntersectionObserver(state, action: PayloadAction<{ stop: boolean, linkUsed?: boolean }>) {
            state.stopObserver = action.payload.stop
            if (action.payload?.linkUsed) {
                state.linkUsed = action.payload.linkUsed
            }
        }
    }
})


export const getCurrentSection = (state: RootState) => state.navigation.currentSection
export const getStopObserver = (state: RootState) => state.navigation.stopObserver
export const { setCurrentSection, setStopIntersectionObserver } = navigationSlice.actions
export default navigationSlice.reducer