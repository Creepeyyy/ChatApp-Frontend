import React from 'react'
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser, reset, resetGet } from '../../../features/userManagement/userManagementSlice';
function ConfirmationDialog(props) {

    const dispatch = useDispatch();
    let { isError, isSuccess } = useSelector((state) => state.userManagement);
    const dUser = () => {
        dispatch(deleteUser({ token: props.token, userID: props.userID }));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(resetGet());
            dispatch(reset());
            props.hide(false);
        }
    }, [props, isError, isSuccess, dispatch])

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => props.hide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Delete {props.userID}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-black">Are you sure you want to delete this user?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" id="DeleteUserCancel" onClick={() => props.hide(false)}>Close</Button>
                    <Button variant="primary" id="DeleteUserConfirm" onClick={() => dUser()}>Delete user</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmationDialog