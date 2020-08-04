import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import {types} from "../types/types";
import * as Swal from "sweetalert2";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const response = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await response.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const response = await fetchSinToken('auth/new', {email, password, name}, 'POST');
        const body = await response.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const response = await fetchConToken('auth/renew');
        const body = await response.json();

        console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinished())
        }
    }
}

const checkingFinished = () => {
    return {
        type: types.authCheckingFinished
    }
}

export const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(logout())
    }
}

export const logout = () => {
    return {
        type: types.authLogout
    }
}
