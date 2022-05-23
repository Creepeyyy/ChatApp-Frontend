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
    useEffect(() => {
        // change background color to bg-dark
        document.body.className = "bg-dark";
    }, []);

    return (
        <div>
            <div id="PrivatePage">
                <SideMenu userID={userID} isAdministrator={isAdministrator} />
            </div>
            <div className="main">
                <Routes>
                    <Route path="verify" element={<VerificationPage />} />
                    <Route path="profile" element={<AccountEditorWidget />} />
                    <Route path="forums" element={<ForumThreadPage />} />
                    <Route path="" element={(
                        <div id="privateLandingPage">
                            <h1>Willkommen zurück {userID}!</h1>
                            <LogoutButton />
                        </div>)} />
                    {isAdministrator ? <Route path="userManagement" element={<UserManagement token={token} />} /> : <></>}
                </Routes>
                {/*                 {switchMenu(showMenu.name)} */}
            </div>
        </div>
    )
}

export default PrivatePage