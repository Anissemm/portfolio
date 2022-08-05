import { combineReducers, configureStore } from "@reduxjs/toolkit"
import navigationSlice from "./reducers/navigationSlice"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import uiSlice from "./reducers/uiSlice"


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    navigation: navigationSlice,
    ui: uiSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export {
    useAppDispatch,
    useAppSelector
} from './hooks'

export const persistor = persistStore(store)

export default store