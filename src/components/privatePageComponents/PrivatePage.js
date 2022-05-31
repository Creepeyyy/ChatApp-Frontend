import React from 'react'
import SideMenu from './SideMenu'
import UserManagement from './userComponents/UserManagement';
import ForumThreadPage from './forumComponents/ForumThreadPage';
import VerificationPage from './verificationComponents/VerificationPage';
import AccountEditorWidget from './AccountEditorWidget';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ForumMessagePage from './forumMessageComponents/ForumMessagePage';

function PrivatePage() {

    const { userID, token, isAdministrator } = useSelector((state) => state.authentication);

    return (
        <div id="PrivatePage">
            <SideMenu userID={userID} isAdministrator={isAdministrator} />
            <div className="main">
                <Routes>
                    <Route path="verify" element={<VerificationPage token={token} />} />
                    <Route path="profile" element={<AccountEditorWidget token={token} />} />
                    <Route path="forums" element={<ForumThreadPage token={token} user={{ userID: userID, isAdministrator: isAdministrator }} />} />
                    <Route path="" element={(
                        <div id="privateLandingPage">
                            <h1>Willkommen zurück {userID}!</h1>
                            <LogoutButton />
                        </div>)} />
                    {isAdministrator ? <Route path="userManagement" element={<UserManagement token={token} />} /> : <></>}
                    <Route path="forums/:id" element={<ForumMessagePage token={token} />} />
                </Routes>
            </div>
        </div>
    )
}

export default PrivatePage