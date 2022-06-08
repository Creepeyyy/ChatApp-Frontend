import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAccount, updateAccount } from '../../../features/accountManagement/accountManagementSlice';
import ConfirmationDialog from './ConfirmationDialog';

function AccountEditorWidget(props) {
  const [input, setInput] = useState({});
  const [started, setStarted] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const dispatch = useDispatch();
  let { account, isPending, isGetPending, isGetSuccess } = useSelector((state) => state.accountManagement);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccount({ token: props.token, userID: props.userID, updateData: input }));
  }

  useEffect(() => {
    if (started === false) {
      setStarted(true);
      dispatch(getAccount({ token: props.token, userID: props.userID }));
      return;
    }
  }, [props, account, started, dispatch])

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-sm-3">
        <div className="col offset-sm-4 text-white text-center">
          <h1>Accountsettings</h1>
        </div>
      </div>
      {isGetPending ? <><span className="spinner-border spinner-border-sm" role="status"></span>Collecting data</> : isGetSuccess ?
        <>
          <Modal.Dialog id="accounteditor">
            <Modal.Body className='bg-dark'>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label>UserID</Form.Label>
                  <Form.Control type="text"
                    defaultValue={account.userID}
                    name="userID"
                    disabled />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder='userName' defaultValue={account.userName} name="userName" onChange={(e) => setInput({ ...input, userName: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label >Password</Form.Label>
                  <Form.Control type="password" placeholder='password' name="password" onChange={(e) => setInput({ ...input, password: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label >Email</Form.Label>
                  <Form.Control type="text" placeholder='email' defaultValue={account.email} name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Check
                    inline
                    type="switch"
                    onChange={(e) => setInput({ ...input, newsletter: e.target.checked })}
                    label={
                      <p>receives newsletter?</p>
                    }
                    defaultChecked={account.newsletter}
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-row justify-content-between">
                  <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    {isPending ? <><span className="spinner-border spinner-border-sm" role="status"></span>Updating</>
                      : <>Submit changes</>}
                  </Button>
                  <Button variant="danger"  onClick={() => setConfirmationDialog(true)}>
                    {isPending ? <><span className="spinner-border spinner-border-sm" role="status"></span>Deleting</>
                      : <>Delete account</>}
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
          {confirmationDialog ? <ConfirmationDialog show={confirmationDialog} hide={setConfirmationDialog} token={props.token} userID={props.userID} /> : <></>}
        </> : <><p>Something went wrong</p></>}
    </div >
  )
}

export default AccountEditorWidget