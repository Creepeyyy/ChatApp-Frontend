import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function SideMenu(props) {
    const [show, setShow] = useState(true);

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
                    <div className="item">
                        <Link to="forums">
                            <i className="bi bi-chat-square-dots-fill" />
                            <p>Forum</p>
                        </Link>
                    </div>
                    {props.isAdministrator ?
                        <div className="item">
                            <Link to="userManagement" id="OpenUserManagementButton">
                                <i className="bi bi-hammer" />
                                <p>Admintools</p>
                            </Link>
                        </div>
                    : <></>}
                    <div className="item">
                        <Link to="" id="OpenPrivatePageButton">
                            <i className="bi bi-arrow-left-circle-fill" />
                            <p>Greeting Page</p>
                        </Link>
                    </div>

                    <div className="item" id="last">
                        <Link to="profile">
                            <i className="bi bi-person-circle" />
                            <p>{props.userID}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SideMenu