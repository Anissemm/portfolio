import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface InitialState {
    version: string;
    author: string;
    appName: string;
}

const initialState: InitialState = {
    version: '0.0.1',
    author: 'Anis Dimassi',
    appName: 'Protfolio'
}

const appMeta = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppVersion: (state, action: PayloadAction<string>) => {
            state.version = action.payload
        },
        setAppName: (state, action: PayloadAction<string>) => {
            state.appName = action.payload
        }
    }
})

export const { setAppVersion, setAppName } = appMeta.actions

export const getAppMeta = (state: RootState) =>  state.app

export default appMeta.reducer