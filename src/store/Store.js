import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/slices/counterSlice/counterSlice';

export const Store =configureStore({
    reducer:{
        counter : counterReducer,
    },
});