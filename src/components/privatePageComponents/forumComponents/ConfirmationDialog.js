import React from 'react'
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteForum, reset, resetGet } from '../../../features/forumManagement/forumManagementSlice';

function ConfirmationDialog(props) {

    const dispatch = useDispatch();
    let { isError, isSuccess } = useSelector((state) => state.forumManagement);

    const dForum = () => {
        dispatch(deleteForum({ token: props.token, forumID: props.forum._id }));
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