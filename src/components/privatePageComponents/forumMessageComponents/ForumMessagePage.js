import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { createMessage, getMessages, reset, resetGet } from '../../../features/forumMessageManagement/forumMessageManagementSlice';
import ConfirmationDialog from '../forumComponents/ConfirmationDialog';
import ForumMessageWidget from './ForumMessageWidget';

function ForumMessagePage(props) {
  const { id } = useParams();
  const location = useLocation();
  const [input, setInput] = useState({
    forumThreadID: id,
  });
  const [createDialog, setCreateDialog] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [started, setStarted] = useState(false);
  let { messages, message, isError, isSuccess, isGetPending, isGetError, isGetSuccess } = useSelector((state) => state.messageManagement);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMessage({ token: props.token, message: input }));
  }

  useEffect(() => {
    if (started === false) {
      setStarted(true);
      dispatch(getMessages(id))
      return;
    }
    if (!(isGetError || isGetSuccess)) {
      dispatch(getMessages(id))
      return;
    }
    if (isGetError) {
      console.log("error");
      return;
    }
    if (isGetSuccess) {
      console.log("success");
      return;
    }

  }, [id, started, isGetError, isGetSuccess, dispatch])

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      console.log("Created: ");
      console.log(message);
      dispatch(resetGet());
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch])

  return (
    <div className="container-fluid" id="messageContainer">
      <div className="row row-cols-1 row-cols-lg-3">
        <div className="col mb-2 mb-lg-0 order-1 order-lg-0 d-flex flex-column justify-content-center">
          <div className="d-flex flex-row justify-content-lg-start justify-content-center">
            <button id="popover-btn" type="button" className="btn bg-primary text-white" onClick={() => setCreateDialog(true)}>Create Message</button>
          </div>
        </div>
        <div className="col order-first order-lg-1 text-white text-center">
          <h1>Forumname</h1>
        </div>
        <div className="col order-last d-flex flex-column justify-content-center">
          <div className="d-flex flex-row justify-content-lg-end justify-content-center">
            <OverlayTrigger trigger="click" placement="bottom"
              overlay={
                <Popover>
                  <Popover.Header as="h3" className="text-black">{location.state ? location.state.forum.name: "Reload Page to see everything"}</Popover.Header>
                  <Popover.Body>
                  {location.state ? location.state.forum.description: "Reload Page to see everything"}
                  </Popover.Body>
                </Popover>}
            >
              <Button variant="secondary">About forum</Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {isGetPending ? <div><span className="spinner-border spinner-border-sm" role="status"></span>Collecting messages...</div> :
        <div className="" id="messagediv">
          {
            messages.map(item => {
              return (
                <div className="card w-100 text-white" id="message" key={item._id}>
                  <div className="card-header d-flex flex-row justify-content-between" id="messageheader">
                    <h4 id="username">{item.authorID}</h4>
                    <div className="d-flex flex-row flex-nowrap">
                      <p className="px-3 my-auto">{new Date(item.createdAt).toLocaleString()}</p>
                      <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle dropdown-toggle-split" type="button"
                          id="message-dropdown" data-bs-toggle="dropdown">
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="message-dropdown">
                          <li><a className="dropdown-item" href="*">Update Message</a></li>
                          <li><a className="dropdown-item" href="*">Delete Message</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
      {createDialog ? <ForumMessageWidget show={createDialog} hide={setCreateDialog} token={props.token} id={id} /> : <></>}
      {/*       {updateDialog ? <ForumMessageWidget show={updateDialog} hide={setUpdateDialog} token={props.token} message={updateDialog} id={id} /> : <></>} */}
      {confirmationDialog ? <ConfirmationDialog show={confirmationDialog} hide={setConfirmationDialog} token={props.token} forum={confirmationDialog} /> : <></>}
      <div className="d-flex flex-row justify-content-center" id="sendbar">
        <div className="col form-floating text-white">
          <input type="text" className="form-control text-white" id="messageTitle" placeholder="MessageTitle" onChange={(e) => setInput({ ...input, title: e.target.value })} />
          <label htmlFor='messageTitle'>Title</label>
        </div>
        <div className="col-8">
          <div className="d-flex">
            <div className="form-floating text-white flex-grow-1" id="messageContent">
              <textarea className="form-control text-white" placeholder="Your text"
                id="messageText" onChange={(e) => setInput({ ...input, text: e.target.value })} />
              <label htmlFor="messageText">Content</label>
            </div>
            <button className="btn btn-primary" id="send" onClick={(e) => handleSubmit(e)}>
              <i className="bi bi-arrow-90deg-right" />
            </button>
          </div>
        </div>
      </div >
    </div >
  )
}

export default ForumMessagePage