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

const deleteForum = (token, forumID) => {
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
    return fetch(`https://localhost/forumThreads/${forumID}`, requestOptions)
    .then(getDeletionMessage)
    .then(message => {
        return message + forumID;
    })
}

const createForum = (token, forum) => {
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
        body: JSON.stringify(forum)
    };
    return fetch(`https://localhost/forumThreads`, requestOptions)
    .then(getCreationMessage)
    .then(forum => {
        return forum;
    })
}

const updateForum = (token, forumID, updateData) => {
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
    if(updateData.name === "") {
        return Promise.reject("Bitte fülle alle Pflichtfelder aus!");
    }
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    };
    return fetch(`https://localhost/forumThreads/${forumID}`, requestOptions)
    .then(getUpdateMessage)
    .then(forum => {
        return forum;
    })
}

const userManagementService = {
    getForums,
    deleteForum,
    createForum,
    updateForum
}

export default userManagementService;