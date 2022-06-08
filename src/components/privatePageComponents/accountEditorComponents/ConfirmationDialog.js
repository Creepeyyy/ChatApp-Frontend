import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount, reset } from '../../../features/accountManagement/accountManagementSlice';
import { logout, reset as resetAuth } from '../../../features/authentication/authenticationSlice';

function ConfirmationDialog(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(deleteAccount({token: props.token, userID: props.userID}));
        dispatch(reset());
        dispatch(logout());
        dispatch(resetAuth());
        navigate("/");
      }

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => props.hide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Delete {props.userID}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-black">Are you sure you want to delete your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="DeleteForumThreadCancel" onClick={() => props.hide(false)}>Close</Button>
                    <Button variant="primary" id="DeleteForumThreadConfirm" onClick={() => handleSubmit()}>Delete forum</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmationDialog