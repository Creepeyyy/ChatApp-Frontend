import React from 'react'
import LoginButton from './LoginButton'
import { Collapse } from 'bootstrap';

function TopMenu() {
    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">MyForums</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav px-5">
                            <li className="nav-item">
                                <a href="#aboutus" className="nav-link">About us</a>
                            </li>
                            <li className="nav-item">
                                <a href="#socials" className="nav-link">Socials</a>
                            </li>
                            <li className="nav-item">
                                <a href="#faq" className="nav-link">FAQ</a>
                            </li>
                        </ul>
                        <div className="ms-auto">
                            <LoginButton />
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default TopMenu