import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createUser, reset } from '../../../features/userCreationSlice';
import { reset as resetUsers } from '../../../features/userManagementSlice';

function UserCreationWidget(props) {
  const [input, setInput] = useState({
    isAdministrator: false,
    newsletter: false
  });
  const dispatch = useDispatch();
  let { isPending, isError, isSuccess, message } = useSelector((state) => state.userCreation);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input.isAdministrator)
    console.log(input.newsletter)
    dispatch(createUser({ token: props.token, user: input }));
    dispatch(resetUsers());
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      console.log("Created: ");
      console.log(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch])

  return (
    <div>
      <Modal show={props.show} onHide={() => props.hide(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Usererstellung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">UserID*</Form.Label>
              <Form.Control id="LoginUserIDInput" type="text" placeholder="userID" name="userID" onChange={(e) => setInput({ ...input, userID: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">Username</Form.Label>
              <Form.Control id="LoginPasswordInput" type="text" placeholder="userName" name="userName" onChange={(e) => setInput({ ...input, userName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">Passwort*</Form.Label>
              <Form.Control id="LoginPasswordInput" type="password" placeholder="password" name="password" onChange={(e) => setInput({ ...input, password: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">Email</Form.Label>
              <Form.Control id="LoginPasswordInput" type="text" placeholder="email" name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} />
            </Form.Group>
            <Form.Check
              inline
              type="switch"
              id="custom-switch"
              onChange={(e) => setInput({ ...input, isAdministrator: e.target.checked })}
              label={
                <p className="text-black">ist Admin?</p>
              }
            />
            <Form.Check
              inline
              type="switch"
              id="custom-switch2"
              onChange={(e) => setInput({ ...input, newsletter: e.target.checked })}
              label={
                <p className="text-black">erhält Newsletter?</p>
              }
            />
            <Form.Group className="mb-3" >
            </Form.Group>
            <Button id="LoginButton" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
              {isPending ? (<><span className="spinner-border spinner-border-sm" role="status"></span>
                Creating new user...</>) : (<>Submit user</>)}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-black">
          *Pflichfelder
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserCreationWidget