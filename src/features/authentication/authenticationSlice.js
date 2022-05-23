import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenticationService from "./authenticationService";

export const login = createAsyncThunk('authentication', async (user, thunkAPI) => {
    try {
        return await authenticationService.login(user.userID, user.password);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        userID: null,
        isAdministrator: false,
        userName: '',
        isError: false,
        isSuccess: false,
        isPending: false,
        message: ''
    },
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isPending = false
            state.message = ''
        },
        logout: (state) => {
            state.userID = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isPending = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.userID = action.payload.userID;
                state.userName = action.payload.userName;
                state.isAdministrator = action.payload.isAdministrator;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { logout, reset } = authenticationSlice.actions;

export default authenticationSlice.reducer;