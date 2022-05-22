const getForums = () => {
    function getAllForums(response) {
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
        method: 'GET'
    };
    return fetch('https://localhost/forumThreads', requestOptions)
    .then(getAllForums)
    .then(forums => {
        return forums;
    })
}

const deleteForum = (token, userID) => {
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
    return fetch(`https://localhost/users/${userID}`, requestOptions)
    .then(getDeletionMessage)
    .then(message => {
        return message + userID;
    })
}

const createForum = (token, user) => {
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
    return fetch(`https://localhost/users`, requestOptions)
    .then(getCreationMessage)
    .then(user => {
        return user;
    })
}

const updateForum = (token, userID, updateData) => {
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
    console.log(requestOptions.body.newsletter);
    return fetch(`https://localhost/users/${userID}`, requestOptions)
    .then(getUpdateMessage)
    .then(user => {
        return user;
    })
}

const userManagementService = {
    getForums,
    deleteForum,
    createForum,
    updateForum
}

export default userManagementService;