import React from 'react'
import { useEffect, useState } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../features/userManagement/userManagementSlice';
import ConfirmationDialog from './ConfirmationDialog';
import UserWidget from './UserWidget';

function UserManagement(props) {
    const [createDialog, setCreateDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [started, setStarted] = useState(false);
    const [searchInput, setSearchInput] = useState({ searchText: "", searchType: "id" });
    const [searchResult, setSearchResult] = useState(false);

    let { user, isGetPending, isGetError, isGetSuccess } = useSelector((state) => state.userManagement);
    const dispatch = useDispatch();

    const search = () => {
        if (searchInput.searchText === "") {
            setSearchResult(false);
            return;
        }
        if (searchInput.searchType === "id") {
            const result = user.find(element => element.userID === searchInput.searchText);
            setSearchResult(result ? [result] : "error");

        } else if (searchInput.searchType === "name") {
            const result = user.filter(element => element.userName === searchInput.searchText);
            setSearchResult(result ? result : "error");
        }
    }

    useEffect(() => {
        if (started === false) {
            setStarted(true);
            dispatch(getUser(props.token));
            return;
        }
        if (!(isGetError || isGetSuccess)) {
            setSearchResult(false);
            dispatch(getUser(props.token));
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
    }, [props, started, isGetError, isGetSuccess, dispatch, searchResult])

    const mapArray = (value) => {
        return (
            value.map(item => {
                return (
                    <tr id={`UserItem${item.userID}`} key={item.userID}>
                        <th scope="row">{item.userID.length > 15 ? item.userID.substring(0, 15) + "..." : item.userID}</th>
                        <td>{item.userName}</td>
                        <td>{item.isAdministrator.toString()}</td>
                        <td>{item.verified ? item.verified.toString() : ""}</td>
                        <td>{item.email ? (item.email.length > 45 ? item.email.substring(0, 45) + "..." : item.email) : item.email}</td>
                        <td>{item.newsletter ? item.newsletter.toString() : ""}</td>
                        <td>
                            <button id={`EditButton${item.userID}`} className="btn btn-secondary" onClick={() =>  setUpdateDialog(item)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        </td>
                        <td>
                            <button id={`DeleteButton${item.userID}`} className="btn btn-danger" onClick={() => setConfirmationDialog(item.userID)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                );
            })
        )
    }

    return (
        <div>
            <div className="container-fluid table-responsive" id="admintools">
                <div className="row row-cols-1 row-cols-sm-3">
                    <div className="col offset-sm-4 text-white text-center">
                        <h1>Users</h1>
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                        <div className="input-group d-flex flex-row justify-content-md-end justify-content-center">
                            <div className="search">
                                <input type="search" id="search" className="form-control" placeholder="Search.." onChange={(e) => setSearchInput({ ...searchInput, searchText: e.target.value })} />
                            </div>
                            <div className="input-group-append">
                                <Dropdown as={ButtonGroup} >
                                    <Dropdown.Toggle variant='outline-secondary' />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setSearchInput({ ...searchInput, searchType: "id" })}>byID</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSearchInput({ ...searchInput, searchType: "name" })}>byName</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => search()}><i
                                    className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                {searchResult === "error" ? <h1  className='text-center mt-3'>There is no user who fullfills your search</h1> :
                    <>
                        {isGetPending ? <div><span className="spinner-border spinner-border-sm" role="status"></span>Collecting users...</div> :
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">UserID</th>
                                        <th scope="col">UserName</th>
                                        <th scope="col" className="col-1">isAdmin</th>
                                        <th scope="col" className="col-1">Verified</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" className="col-1">Newsletter</th>
                                        <th scope="col" className="col-1">Update</th>
                                        <th scope="col" className="col-1">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResult ? mapArray(searchResult) : mapArray(user)}
                                    <tr>
                                        <th scope="row">
                                            <button className="btn btn-primary" id="OpenCreateUserDialogButton" onClick={() => setCreateDialog(true)}>
                                                <i className="bi bi-plus"> Add User</i>
                                            </button>
                                            {createDialog ? <UserWidget show={createDialog} hide={setCreateDialog} token={props.token} /> : <></>}
                                        </th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </>}
                {updateDialog ? <UserWidget show={updateDialog} hide={setUpdateDialog} token={props.token} user={updateDialog} /> : <></>}
                {confirmationDialog ? <ConfirmationDialog show={confirmationDialog} hide={setConfirmationDialog} token={props.token} userID={confirmationDialog} /> : <></>}
            </div>
        </div>
    )
}

export default UserManagement