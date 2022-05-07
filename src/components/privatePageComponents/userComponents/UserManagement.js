import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser, reset } from '../../../features/userManagementSlice';

function UserManagement(props) {
    const dispatch = useDispatch();
    const { user, isPending, isError, isSuccess, message } = useSelector((state) => state.userManagement);
    const showUsers = () => {
        dispatch(getUser(props.token));
    }
    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (isSuccess) {
            console.log("show users");
        }
        dispatch(reset)
    }, [isError, isSuccess, message, dispatch])

    useEffect(() => {
        showUsers()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <div className="container-fluid table-responsive" id="admintools">
                <div className="row row-cols-1 row-cols-sm-3 my-2">
                    <div className="col offset-sm-4 text-white text-center">
                        <h1>Users</h1>
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                        <div className="input-group d-flex flex-row justify-content-md-end justify-content-center">
                            <div className="search">
                                <input type="search" id="search" className="form-control" placeholder="Search.." />
                            </div>
                            <div className="input-group-append">
                                <button type="button"
                                    className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" data-bs-target="#filter">
                                </button>
                                <button type="button" className="btn btn-outline-secondary"><i
                                    className="bi bi-search"></i></button>
                                <div className="dropdown-menu" id="filter">
                                    <a className="dropdown-item" href="*">byID</a>
                                    <a className="dropdown-item" href="*">byName</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isPending ? <div><span className="spinner-border spinner-border-sm" role="status"></span>Collecting User...</div> :
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
                            {user.map(item => {
                                return (
                                    <tr key={item.userID}>
                                        <th scope="row">{item.userID}</th>
                                        <td>{item.userName}</td>
                                        <td>{item.isAdministrator}</td>
                                        <td>{item.verified}</td>
                                        <td>{item.email}</td>
                                        <td>{item.newsletter}</td>
                                        <td><button className="btn btn-secondary">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        </td>
                                        <td><button className="btn btn-danger">
                                        <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <th scope="row">
                                    <button className="btn btn-primary" id="addUser" onClick={() => console.log("a")}>
                                        <i className="bi bi-plus"> Add User</i>
                                    </button>
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

                {/*                 <div className="text-center text-md-end m-2">

                </div> */}
            </div>
        </div>
    )
}

export default UserManagement