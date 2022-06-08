import config from 'react-global-configuration';

const getAccount = (token, userID) => {
    function getAccount(response) {
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
    return fetch(`${config.get('url')}users/${userID}`, requestOptions)
    .then(getAccount)
    .then(account => {
        return account;
    })
}

const deleteAccount = (token, userID) => {
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
        console.log(message);
        return message + userID;
    })
}

const updateAccount = (token, userID, updateData) => {
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
    .then(account => {
        return account;
    })
}

const accountManagementService = {
    getAccount,
    deleteAccount,
    updateAccount
}

export default accountManagementService;