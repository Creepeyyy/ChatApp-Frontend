import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import userDialogReducer from "../features/userManagement/userDialogSlice";
import userManagementReducer from "../features/userManagement/userManagementSlice";
import forumManagementReducer from "../features/forumManagement/forumManagementSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        userManagement: userManagementReducer,
        userDialogManagement: userDialogReducer,
        forumManagement: forumManagementReducer,
    },
});