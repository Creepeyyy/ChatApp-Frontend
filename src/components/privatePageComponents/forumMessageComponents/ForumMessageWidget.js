import React from 'react'
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createMessage, reset } from '../../../features/forumMessageManagement/forumMessageManagementSlice';

function ForumMessageWidget(props) {
    const [input, setInput] = useState({
        forumThreadID: props.id,
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage({ token: props.token, message: input }));
        props.hide(false);
    }

    const close = () => {
        props.hide(false);
        dispatch(reset());
    }

    return (
        <div>
            <Modal show={props.show ? true : false} onHide={() => close()}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Message creator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Message title</Form.Label>
                            <Form.Control id="ForumMessageTitleInput" type="text"
                                placeholder='title'
                                name="title"
                                onChange={(e) => setInput({ ...input, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Message content</Form.Label>
                            <Form.Control id="ForumMessageTextInput" as="textarea" rows={5}
                                placeholder='content'
                                name="text"
                                onChange={(e) => setInput({ ...input, text: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="d-flex flex-row justify-content-between mx-2">
                            <Button id="CreateForumMessageButton" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                                Creating message
                            </Button>
                            <Button variant="secondary" id= "CancelCreateForumMessageButton" onClick={() => close()}>
                                Back to List
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ForumMessageWidget