import React from 'react'
import SideMenu from './SideMenu'
import { useEffect } from 'react'
import UserManagement from './userComponents/UserManagement';
import ForumThreadPage from './forumComponents/ForumThreadPage';
import VerificationPage from './verificationComponents/VerificationPage';
import AccountEditorWidget from './AccountEditorWidget';
import ChatPage from './chatComponents/ChatPage';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function PrivatePage() {
    const [showMenu, setShowMenu] = useState({ name: 'forum' });

    const { userID, token } = useSelector((state) => state.authentication);
    useEffect(() => {
        // change background color to bg-dark
        document.body.className = "bg-dark";
    }, [showMenu]);

    const switchMenu = (param) => {
        switch (param) {
            case 'verify':
                return <VerificationPage />;
            case 'profileManagement':
                return <AccountEditorWidget />;
            case 'chat':
                return <ChatPage />;
            case 'forum':
                return <ForumThreadPage />;
            case 'userManagement':
                return <UserManagement token={token}/>;
            default:
                return <ForumThreadPage />;
        }
    }

    return (
        <div>
            <div id="PrivatePage">
                <SideMenu userID={userID} setShowMenu={setShowMenu} />
            </div>
            <div className="main">
                {switchMenu(showMenu.name)}
            </div>
        </div>
    )
}

export default PrivatePage