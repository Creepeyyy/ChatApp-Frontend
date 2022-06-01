import React from 'react'
import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage, reset, resetGet, updateMessage } from '../../../features/forumMessageManagement/forumMessageManagementSlice';

function ForumMessageWidget(props) {
    const [input, setInput] = useState({
        forumThreadID: props.id,
    });

    const dispatch = useDispatch();
    let { isPending, isError, isSuccess, message } = useSelector((state) => state.messageManagement);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.message) {
            dispatch(updateMessage({ token: props.token, messageID: props.message._id, updateData: input }));
        } else {
            dispatch(createMessage({ token: props.token, message: input }));
        }
    }

    const close = () => {
        props.hide(false);
        dispatch(reset());
    }

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (isSuccess) {
            console.log("Created: ");
            console.log(message);
            dispatch(resetGet());
            dispatch(reset());
            props.hide(false);
        }
    }, [props, isError, isSuccess, message, dispatch])

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => close()}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">{props.message ? "Message Editor" : "Message Creator"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Message title</Form.Label>
                            <Form.Control id="ForumThreadNameInput" type="text"
                                placeholder={props.message ? props.message.title : 'title'}
                                defaultValue={props.message ? props.message.title : ''}
                                name="title"
                                onChange={(e) => setInput({ ...input, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Message content</Form.Label>
                            <Form.Control id="ForumThreadDescriptionInput" as="textarea" rows={5}
                                placeholder={props.message ? props.message.text : 'content'}
                                defaultValue={props.message ? props.message.text : ''}
                                name="text"
                                onChange={(e) => setInput({ ...input, text: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="d-flex flex-row justify-content-between mx-2">
                            <Button id={props.message ? "SaveForumThreadButton" : "CreateForumThreadButton"} variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                                {isPending ? (<><span className="spinner-border spinner-border-sm" role="status"></span>
                                    {props.message ? 'Creating new' : 'Updating'} message...</>) : (<>Send message</>)}
                            </Button>
                            <Button variant="secondary" id={props.message ? "CancelEditForumThreadButton" : "CancelCreateForumThreadButton"} onClick={() => close()}>
                                Back to List
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="text-black">
                    {isError ? <p className="me-auto text-danger">Versuche es nochmal!</p> : <></>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ForumMessageWidget