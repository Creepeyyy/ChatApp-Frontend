import React, { useState } from 'react'
import UserSessionWidget from './UserSessionWidget';

function LoginButton() {
    const [loginDialog, setLoginDialog] = useState(false);

    return (
        <div>
            <button id="LoginOpenDialogButton" className="btn btn-primary" onClick={() => setLoginDialog(true)}>
                Login
            </button>
            <UserSessionWidget show={loginDialog} hide={setLoginDialog} />
        </div>
    )
}

export default LoginButton;

