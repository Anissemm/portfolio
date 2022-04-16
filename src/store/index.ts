import { configureStore } from "@reduxjs/toolkit"
import app from './reducers/appMeta'

const store = configureStore({
    reducer: {
        app
    }
})

export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export {
    useAppDispatch,
    useAppSelector
} from './hooks'

export default store