const getUser = (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': token}
    };
    return fetch('https://localhost/users', requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    })
}

function handleResponse(response) {
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
    getUser
}

export default userManagementService;