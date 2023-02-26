/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentUserString } from '../../utils/enums';

const initialState: {
    user: string | null;
} = {
    user: localStorage.getItem(currentUserString),
};

export const userSlice = createSlice({
    name: currentUserString,
    initialState,
    reducers: {
        changedCurrentUser(state, action: PayloadAction<string>) {
            const currentUser = action.payload;
            state.user = currentUser;
            localStorage.setItem(currentUserString, currentUser);
        },
        loggedOutCurrentUser(state) {
            state.user = null;
            localStorage.removeItem(currentUserString);
        },
    },
});

export const { changedCurrentUser, loggedOutCurrentUser } = userSlice.actions;
