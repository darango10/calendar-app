import React from 'react';
import './login.css'
import {useForm} from "../../hooks/useForm";
import {useDispatch} from "react-redux";
import {startLogin, startRegister} from "../../actions/auth";
import * as Swal from "sweetalert2";

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [loginValues, handleLoginInputChange] = useForm({
        loginEmail: 'arango@mail.com',
        loginPassword: '123456'
    })

    const [registerValues, handleRegisterInputChange] = useForm({
        registerName: 'Daniel Felipe',
        registerEmail: 'danielarango@mail.com',
        registerPassword1: '123456',
        registerPassword2: '123456'
    })

    const handleLogin = e => {
        e.preventDefault()
        dispatch(startLogin(loginValues.loginEmail, loginValues.loginPassword))
    }

    const handleRegister = e => {
        e.preventDefault()

        if (registerValues.registerPassword1 !== registerValues.registerPassword2) {
            return Swal.fire('Error', 'Los passwords no coinciden', 'error')
        }

        dispatch(startRegister(registerValues.registerEmail, registerValues.registerPassword1, registerValues.registerName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginValues.loginEmail}
                                onChange={handleLoginInputChange}
                                autoComplete="false"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginValues.loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name={'registerName'}
                                value={registerValues.registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name={'registerEmail'}
                                value={registerValues.registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name={'registerPassword1'}
                                value={registerValues.registerPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name={'registerPassword2'}
                                value={registerValues.registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
