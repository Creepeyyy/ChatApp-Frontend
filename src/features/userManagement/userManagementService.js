import config from 'react-global-configuration';

const getUser = (token) => {
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
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': token}
    };
    return fetch(`${config.get('url')}users`, requestOptions)
    .then(getAllUser)
    .then(users => {
        return users;
    })
}

const deleteUser = (token, userID) => {
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
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': token}
    };
    return fetch(`${config.get('url')}users/${userID}`, requestOptions)
    .then(getDeletionMessage)
    .then(message => {
        return message + userID;
    })
}

const createUser = (token, user) => {
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
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    return fetch(`${config.get('url')}users`, requestOptions)
    .then(getCreationMessage)
    .then(user => {
        return user;
    })
}

const updateUser = (token, userID, updateData) => {
    function getUpdateMessage(response) {
        return response.text().then(text => {
            if(!response.ok) {
                const error = response.statusText;
                return Promise.reject(error);
            } else {
                return JSON.parse(text);
            }
        })
    }
    if(updateData.password === "") {
        delete updateData.password
    }
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    };
    return fetch(`${config.get('url')}users/${userID}`, requestOptions)
    .then(getUpdateMessage)
    .then(user => {
        return user;
    })
}

const userManagementService = {
    getUser,
    deleteUser,
    createUser,
    updateUser
}

export default userManagementService;