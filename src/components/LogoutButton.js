import React from 'react'
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/authenticationSlice';

function LogoutButton() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={() => onLogout()}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton