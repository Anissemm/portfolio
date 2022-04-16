import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, StoreDispatch } from "."

export const useAppDispatch = () => useDispatch<StoreDispatch>() 

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector