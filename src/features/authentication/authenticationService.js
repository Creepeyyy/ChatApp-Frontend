import { Buffer } from "buffer"
import jwt_decode from 'jwt-decode'

const login = (userID, password) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Basic ' + Buffer.from(userID + ":" + password, "utf-8").toString("base64")}
    };
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
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            const user = jwt_decode(token);
            const userSession = {
                userID: user.userID,
                isAdministrator: user.isAdministrator,
                userName: user.userName,
                token: "Bearer " + token
            }
            return userSession;
        }
    })
}

const authenticationService = {
    login
}

export default authenticationService;