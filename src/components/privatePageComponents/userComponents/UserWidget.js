import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createUser, reset, updateUser } from '../../../features/userManagement/userDialogSlice';
import { reset as resetUsers } from '../../../features/userManagement/userManagementSlice';

function UserWidget(props) {
  const [input, setInput] = useState({
    isAdministrator: props.user ? props.user.isAdministrator : false,
    newsletter: props.user ? props.user.newsletter : false
  });

  const dispatch = useDispatch();
  let { isPending, isError, isSuccess, message } = useSelector((state) => state.userDialogManagement);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.user) {
      dispatch(updateUser({ token: props.token, userID: props.user.userID, updateData: input }));
    } else {
      dispatch(createUser({ token: props.token, user: input }));
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
      dispatch(resetUsers());
      dispatch(reset());
      props.hide(false);
    }
  }, [props, isError, isSuccess, message, dispatch])

  return (
    <div>
      <Modal show={props.show ? true : false} onHide={() => close()}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">{props.user ? "User Editor" : "User Creator"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">{props.user ? "UserID" : "UserID*"}</Form.Label>
              <Form.Control id="UserIDInput" type="text"
                placeholder={props.user ? props.user.userID : 'userID'}
                name="userID" onChange={(e) => setInput({ ...input, userID: e.target.value })}
                disabled={props.user ? true : false} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">Username</Form.Label>
              <Form.Control id="UserNameInput" type="text" placeholder={props.user ? props.user.userName : 'userName'} defaultValue={props.user ? props.user.userName : ''} name="userName" onChange={(e) => setInput({ ...input, userName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">{props.user ? "Password" : "Password*"}</Form.Label>
              <Form.Control id="PasswordInput" type="password" placeholder='password' name="password" onChange={(e) => setInput({ ...input, password: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="text-black">Email</Form.Label>
              <Form.Control id="EmailInput" type="text" placeholder={props.user ? props.user.email : 'email'} defaultValue={props.user ? props.user.email : ''} name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Check
                inline
                type="switch"
                id="isAdministratorInput"
                onChange={(e) => setInput({ ...input, isAdministrator: e.target.checked })}
                label={
                  <p className="text-black">is admin?</p>
                }
                defaultChecked={input.isAdministrator}
              />
              <Form.Check
                inline
                type="switch"
                id="isNewsletterEnjoyerInput"
                onChange={(e) => setInput({ ...input, newsletter: e.target.checked })}
                label={
                  <p className="text-black">receives newsletter?</p>
                }
                defaultChecked={input.newsletter}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-row justify-content-between mx-2">
              <Button id={props.user ? "SaveUserButton" : "CreateUserButton"} variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                {isPending ? (<><span className="spinner-border spinner-border-sm" role="status"></span>
                  {props.user ? 'Updating ' : 'Creating new '} user...</>) : (<>Submit user</>)}
              </Button>
              <Button variant="secondary" id={props.user ? "CancelEditUserButton" : "CancelCreateUserButton"} onClick={() => close()}>
                Back to List
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        {props.user ? <></> :
          <Modal.Footer className="text-black">
            {isError ? <p className="me-auto text-danger">Bitte fülle alle Pflichtfelder aus!</p> : <></>}
            *Pflichfelder
          </Modal.Footer>
        }
      </Modal>
    </div>
  )
}

export default UserWidget