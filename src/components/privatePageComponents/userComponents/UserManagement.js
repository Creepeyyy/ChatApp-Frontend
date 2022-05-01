import React from 'react'

function UserManagement() {
    return (
        <div><div className="container-fluid table-responsive" id="admintools">
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">UserID</th>
                        <th scope="col">UserName</th>
                        <th scope="col" className="col-1">isAdmin</th>
                        <th scope="col" className="col-1">Verified</th>
                        <th scope="col">Email</th>
                        <th scope="col" className="col-1">Newsletter</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">markus</th>
                        <td>Markus</td>
                        <td>true</td>
                        <td>true</td>
                        <td>
                            markus@gmail.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <th scope="row">admin</th>
                        <td></td>
                        <td>true</td>
                        <td>true</td>
                        <td>admin@gmail.com</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <button className="btn btn-primary" id="addUser">
                                <i className="bi bi-plus"> Add User</i>
                            </button>
                        </th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className="text-center text-md-end m-2">
                <button className="btn btn-danger">Reset Changes</button>
                <button className="btn btn-success ">Commit Changes</button>
            </div>
        </div></div>
    )
}

export default UserManagement