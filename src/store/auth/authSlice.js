import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // Ver si esta autenticado o no.
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onCheking: (state) => {
            state.status = 'cheking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        }
    }
})

export const { onCheking, onLogin } = authSlice.actions;