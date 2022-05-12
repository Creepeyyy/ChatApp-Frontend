const getUser = (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': token}
    };
    return fetch('https://localhost/users', requestOptions)
    .then(getAllUser)
    .then(users => {
        return users;
    })
}

const deleteUser = (token, userID) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': token}
    };
    return fetch(`https://localhost/users/${userID}`, requestOptions)
    .then(getDeletionMessage)
    .then(message => {
        return message + userID;
    })
}

const createUser = (token, user) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    console.log(requestOptions.body.newsletter);
    return fetch(`https://localhost/users`, requestOptions)
    .then(getCreationMessage)
    .then(user => {
        return user;
    })
}

function getCreationMessage(response) {
    return response.text().then(text => {
        if(!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            return JSON.parse(text);
        }
    })
}

function getDeletionMessage(response) {
    return response.text().then(text => {
        if(!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            return JSON.parse(text);
        }
    })
}

function getAllUser(response) {
    return response.text().then(text => {
        if(!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            return JSON.parse(text);
        }
    })
}



const userManagementService = {
    getUser,
    deleteUser,
    createUser
}

export default userManagementService;