import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import userManagementReducer from "../features/userManagement/userManagementSlice";
import forumManagementReducer from "../features/forumManagement/forumManagementSlice";
import forumMessageManagementReducer from "../features/forumMessageManagement/forumMessageManagementSlice";
import accountManagementReducer from "../features/accountManagement/accountManagementSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        userManagement: userManagementReducer,
        forumManagement: forumManagementReducer,
        messageManagement: forumMessageManagementReducer,
        accountManagement: accountManagementReducer
    },
});