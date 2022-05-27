import React from 'react'
import SideMenu from './SideMenu'
import { useEffect } from 'react'
import UserManagement from './userComponents/UserManagement';
import ForumThreadPage from './forumComponents/ForumThreadPage';
import VerificationPage from './verificationComponents/VerificationPage';
import AccountEditorWidget from './AccountEditorWidget';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import LogoutButton from '../LogoutButton';

function PrivatePage() {

    const { userID, token, isAdministrator } = useSelector((state) => state.authentication);

    return (
        <div id="PrivatePage">
            <SideMenu userID={userID} isAdministrator={isAdministrator} />
            <div className="main">
                <Routes>
                    <Route path="verify" element={<VerificationPage token={token} />} />
                    <Route path="profile" element={<AccountEditorWidget token={token} />} />
                    <Route path="forums" element={<ForumThreadPage token={token} />} />
                    <Route path="" element={(
                        <div id="privateLandingPage">
                            <h1>Willkommen zurück {userID}!</h1>
                            <LogoutButton />
                        </div>)} />
                    {isAdministrator ? <Route path="userManagement" element={<UserManagement token={token} />} /> : <></>}
                </Routes>
            </div>
        </div>
    )
}

export default PrivatePage