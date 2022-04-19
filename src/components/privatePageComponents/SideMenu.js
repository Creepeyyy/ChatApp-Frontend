import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import '../../layout/css/SideMenu.css'

function SideMenu() {
    const [show, setShow] = useState(false);
    const { userID } = useSelector((state) => state.authentication);
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
                    <div className="item"><a href="/" onClick={(e) => {e.preventDefault()}}>
                        <i className="bi bi-chat-text"></i>
                        <p>Chat</p>
                    </a>
                    </div>
                    <div className="item"><a href="*">
                        <i className="bi bi-chat-square-dots-fill"></i>
                        <p>Forum</p>
                    </a>
                    </div>
                    <div className="item"><a href="*">
                        <i className="bi bi-person-check-fill"></i>
                        <p>Verify</p>
                    </a>
                    </div>
                    <div className="item"><a href="#admintools"><i className="bi bi-hammer">

                    </i>
                        <p>Admintools</p>
                    </a>
                    </div>
                    <div className="item" id="last">
                        <a href="*"><i className="bi bi-person-circle">

                        </i>
                            <p>{userID}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu