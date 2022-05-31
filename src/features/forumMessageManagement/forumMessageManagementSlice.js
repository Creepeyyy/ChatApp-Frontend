import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import Message from "./forumMessageManagementService";

export const getMessages = createAsyncThunk('getMessages', async (MessageID, thunkAPI) => {
    try {
        return await Message.getMessages(MessageID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteMessage = createAsyncThunk('deleteMessage', async (data, thunkAPI) => {
    try {
        return await Message.deleteMessage(data.token, data.messageID);
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
});

export const createMessage = createAsyncThunk('createMessage', async (data, thunkAPI) => {
    try {
        return await Message.createMessage(data.token, data.message);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateMessage = createAsyncThunk('updateMessage', async (data, thunkAPI) => {
    try {
        return await Message.updateMessage(data.token, data.messageID, data.updateData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const MessageManagementSlice = createSlice({
    name: "messageManagement",
    initialState: {
        messages: [],
        isError: false,
        isSuccess: false,
        isPending: false,
        isGetError: false,
        isGetSuccess: false,
        isGetPending: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isPending = false;
            state.message = '';
        },
        resetGet: (state) => {
            state.isGetError = false;
            state.isGetSuccess = false;
            state.isGetPending = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMessages.rejected, (state, action) => {
            state.isGetPending = false;
            state.isGetSuccess = false;
            state.isGetError = true;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.isGetPending = false;
            state.isGetSuccess = true;
            state.isGetError = false;
            state.messages = action.payload;
        })
        .addCase(isAnyOf(getMessages.pending), (state, action) => {
            state.isGetPending = true;
        })
        .addMatcher(isAnyOf(createMessage.pending, updateMessage.pending, deleteMessage.pending), (state,action) => {
            state.isPending = true;
        })
        .addMatcher(isAnyOf(createMessage.fulfilled, updateMessage.fulfilled, deleteMessage.fulfilled), (state, action) => {
            state.isPending = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload;
        })
        .addMatcher(isAnyOf(createMessage.rejected, updateMessage.rejected, deleteMessage.rejected), (state, action) => {
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    },
});


export const { reset, resetGet } = MessageManagementSlice.actions;

export default MessageManagementSlice.reducer;