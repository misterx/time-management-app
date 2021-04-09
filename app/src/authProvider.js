import { AUTH_LOGIN,AUTH_LOGOUT,AUTH_CHECK,AUTH_ERROR,AUTH_GET_PERMISSIONS } from 'react-admin';
import {API_EP} from "./constants";
import jwtDecode from 'jwt-decode'
import {ADMIN_ROLE} from "./constants";

export default (type, params) => {
    //console.log(type,params);
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(API_EP+'/rpc/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, pass: password }),
            headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.pgrst.object+json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status === 403 ) {
                    throw new Error("Invalid credentials");
                }
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token}) => {
                localStorage.setItem('token', token);
            });
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.resolve();
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject();
        }
        const payload = jwtDecode(token);
        return Promise.resolve(payload.role===ADMIN_ROLE?'admin':'user');
    }

    return Promise.reject('Unknown method');
}