import { Buffer } from "buffer"

const login = (userID, password) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Basic ' + Buffer.from(userID + ":" + password, "utf-8").toString("base64")}
    };
    console.log(requestOptions.headers)
    return fetch('https://localhost/authenticate', requestOptions)
    .then(handleResponse)
    .then(userSession => {
        return userSession;
    })
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log("Token: " + authorizationHeader);
        let token;
        if(authorizationHeader) {
            token = authorizationHeader.split(" ")[1];
        }

        if(!response.ok) {
            if(response.status === 401) {
                return
            }
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            const userSession = {
                userID: JSON.parse(text).userID,
                token: token
            }
            console.log(userSession);
            return userSession;
        }
    })
}

const authenticationService = {
    login
}

export default authenticationService;