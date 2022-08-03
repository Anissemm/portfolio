import { combineReducers, configureStore } from "@reduxjs/toolkit"
import app from './reducers/appMeta'
import navigationSlice from "./reducers/navigationSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    app,
    navigation: navigationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export {
    useAppDispatch,
    useAppSelector
} from './hooks'

export const persistor = persistStore(store)

export default store