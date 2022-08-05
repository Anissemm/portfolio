import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface UI {
    currentBreakpoint: string | null
}

const initialState: UI = {
    currentBreakpoint: null
}

const uiSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setBreakpoint(state, action: PayloadAction<string | null>) {
            state.currentBreakpoint = action.payload
        }
    }
})


export const getCurrentBreakpoint = (state: RootState) => state.ui.currentBreakpoint
export const { setBreakpoint } = uiSlice.actions
export default uiSlice.reducer