const getMessages = (forumID) => {
    function getAllMessages(response) {
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
    return fetch(`https://localhost/forumThreads/${forumID}/forumMessages`, requestOptions)
    .then(getAllMessages)
    .then(messages => {
        return messages;
    })
}

const deleteMessage = (token, messageID) => {
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
    return fetch(`https://localhost/forumMessages/${messageID}`, requestOptions)
    .then(getDeletionMessage)
    .then(message => {
        return message;
    })
}

const createMessage = (token, message) => {
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
        body: JSON.stringify(message)
    };
    return fetch(`https://localhost/forumMessages`, requestOptions)
    .then(getCreationMessage)
    .then(message => {
        return message;
    })
}

const updateMessage = (token, messageID, updateData) => {
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
    return fetch(`https://localhost/forumMessages/${messageID}`, requestOptions)
    .then(getUpdateMessage)
    .then(message => {
        return message;
    })
}

const messageManagementService = {
    getMessages,
    deleteMessage,
    createMessage,
    updateMessage
}

export default messageManagementService;