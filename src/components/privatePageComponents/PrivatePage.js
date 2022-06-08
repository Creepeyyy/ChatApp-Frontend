import React from 'react'
import SideMenu from './SideMenu'
import UserManagement from './userComponents/UserManagement';
import ForumThreadPage from './forumComponents/ForumThreadPage';
import AccountEditorWidget from './accountEditorComponents/AccountEditorWidget';
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
                    <Route path="profile" element={<AccountEditorWidget token={token} userID={userID}/>} />
                    <Route path="forums" element={<ForumThreadPage token={token} user={{ userID: userID, isAdministrator: isAdministrator }} />} />
                    <Route path="forums/:id" element={<ForumMessagePage token={token} user={{ userID: userID, isAdministrator: isAdministrator }} />} />
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