import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../../features/forumMessageManagement/forumMessageManagementSlice';

function ConfirmationDialog(props) {

    const dispatch = useDispatch();

    const dMessage = () => {
        dispatch(deleteMessage({ token: props.token, messageID: props.message._id }));
        props.hide(false);
    }

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => props.hide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Delete {props.message.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-black">Are you sure you want to delete this message?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="DeleteForumThreadCancel" onClick={() => props.hide(false)}>Close</Button>
                    <Button variant="primary" id="DeleteForumThreadConfirm" onClick={() => dMessage()}>Delete message</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmationDialog