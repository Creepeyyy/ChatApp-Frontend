import React from 'react'
import SideMenu from './SideMenu'
import '../../layout/css/PrivatePage.css'
import { useEffect } from 'react'
import UserManagement from './userComponents/UserManagement';
import ForumThreadPage from './forumComponents/ForumThreadPage';
import VerificationPage from './verificationComponents/VerificationPage';
import AccountEditorWidget from './AccountEditorWidget';
import ChatPage from './chatComponents/ChatPage';
import { useState } from 'react';


function PrivatePage() {
    const [showMenu, setShowMenu] = useState({ name: 'forum' });

    useEffect(() => {
        // change background color to bg-dark
        document.body.className = "bg-dark";
    });

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
                return <UserManagement/>;
            default:
                return <ForumThreadPage />;
        }
    }

    return (
        <div>
            <div id="PrivatePage">
                <SideMenu setShowMenu={setShowMenu} />
            </div>
            <div className="main">
                {switchMenu(showMenu.name)}
            </div>
        </div>
    )
}

export default PrivatePage