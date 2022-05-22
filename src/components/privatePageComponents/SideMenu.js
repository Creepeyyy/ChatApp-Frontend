import React from 'react'
import { useState } from 'react'

function SideMenu(props) {
    const [show, setShow] = useState(true);

    const handleMenu = (e, menu) => {
        e.preventDefault();
        props.setShowMenu({name: menu});
    }

    return (
        <div>
            <div className="toggle-sidebar position-fixed bg-dark" onClick={() => setShow(true)} hidden={show ? true : false}>
                <i className="bi bi-list"></i>
            </div>

            <div className={show ? "sidebar active position-fixed bg-dark" : "sidebar position-fixed bg-dark"}>
                <div className="exit-sidebar" onClick={() => setShow(false)}>
                    <i className="bi bi-x-circle"></i>
                </div>
                <div className="menu">
                    <div className="item"><a href="*" onClick={(e) => handleMenu(e, 'chat')}>
                        <i className="bi bi-chat-text"></i>
                        <p>Chat</p>
                    </a>
                    </div>
                    <div className="item"><a href="*" onClick={(e) => handleMenu(e, 'forum')}>
                        <i className="bi bi-chat-square-dots-fill"></i>
                        <p>Forum</p>
                    </a>
                    </div>
                    <div className="item"><a href="*" onClick={(e) => handleMenu(e, 'verify')}>
                        <i className="bi bi-person-check-fill"></i>
                        <p>Verify</p>
                    </a>
                    </div>
                    <div className="item"><a id="OpenUserManagementButton" href="*" onClick={(e) => handleMenu(e, 'userManagement')}><i className="bi bi-hammer">
                    </i>
                        <p>Admintools</p>
                    </a>
                    </div>
                    <div className="item" id="last">
                        <a href="*" onClick={(e) => handleMenu(e, 'profileManagement')}><i className="bi bi-person-circle">

                        </i>
                            <p>{props.userID}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu