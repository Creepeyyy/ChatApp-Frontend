import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/authentication/authenticationSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <div>
      <button id="LogoutButton" className="btn btn-primary" onClick={() => onLogout()}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton