import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function UserSessionWidget(props) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");


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
                            <Form.Control id="LoginUserIDInput" type="text" placeholder="userID" name="userID" value={userID} onChange={(e) => setUserID(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="LoginPasswordInput" type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        </Form.Group>
                        <Button id="LoginButton" variant="primary" type="submit">
                            Einloggen
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