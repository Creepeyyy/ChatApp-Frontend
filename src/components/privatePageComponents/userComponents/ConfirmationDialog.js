import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUser} from '../../../features/userManagement/userManagementSlice';
function ConfirmationDialog(props) {

    const dispatch = useDispatch();

    const dUser = () => {
        dispatch(deleteUser({ token: props.token, userID: props.userID }));
        props.hide(false);
    }

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