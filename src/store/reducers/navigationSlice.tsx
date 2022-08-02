import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface NavigationSlice {
    currentSection: string
    previousSection: string
}

const initialState: NavigationSlice = {
    currentSection: '',
    previousSection: ''
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentSection(state, action: PayloadAction<string>) {
            state.previousSection = state.currentSection
            state.currentSection = action.payload
        }
    }
})


export const getCurrentSection = (state: RootState) => state.navigation.currentSection
export const { setCurrentSection } = navigationSlice.actions
export default navigationSlice.reducer