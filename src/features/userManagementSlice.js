import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userManagementService from "./userManagementService";

export const getUser = createAsyncThunk('userManagement', async (token, thunkAPI) => {
    try {
        return await userManagementService.getUser(token);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const userManagementSlice = createSlice({
    name: "userManagement",
    initialState: {
        user: [],
        isError: false,
        isSuccess: false,
        isPending: false,
        message: ''
    },
    reducers: {
        reset: (state) => {
            /* state.user = [] */
            state.isError = false
            state.isSuccess = false
            state.isPending = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isPending = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isPending = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = userManagementSlice.actions;

export default userManagementSlice.reducer;