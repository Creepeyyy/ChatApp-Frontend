import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteForum } from '../../../features/forumManagement/forumManagementSlice';

function ConfirmationDialog(props) {

    const dispatch = useDispatch();

    const dForum = () => {
        dispatch(deleteForum({ token: props.token, forumID: props.forum._id }));
        props.hide(false);
    }

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => props.hide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Delete {props.forum.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-black">Are you sure you want to delete this forum?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="DeleteForumThreadCancel" onClick={() => props.hide(false)}>Close</Button>
                    <Button variant="primary" id="DeleteForumThreadConfirm" onClick={() => dForum()}>Delete forum</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmationDialog