import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login, reset } from '../features/authenticationSlice'

function UserSessionWidget(props) {
    const [formUserID, setformUserID] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { userID, isPending, isError, isSuccess, token, message } = useSelector((state) => state.authentication);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            userID: formUserID,
            password: password
        }))
    }

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (isSuccess || userID) {
            console.log("loged in");
        }
        dispatch(reset)
    }, [userID, isError, isSuccess, message, dispatch])

    return (
        <div>
            <Modal show={props.show} onHide={() => props.hide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Einloggen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>UserID</Form.Label>
                            <Form.Control id="LoginUserIDInput" type="text" placeholder="userID" name="userID" value={formUserID} onChange={(e) => setformUserID(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="LoginPasswordInput" type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        </Form.Group>
                        <Button id="LoginButton" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                            {isPending ? (<><span className="spinner-border spinner-border-sm" role="status"></span>
                                Logging in...</>) : (<>Einloggen</>)}

                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="text-black">
                    Registrieren
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserSessionWidget