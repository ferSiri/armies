import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from "react-router-dom";
import { MainContext } from '../Contexts/MainContext';


export default function SignUp() {
    const { register, handleSubmit, watch, errors } = useForm();
    const { newUser, registerNewUser, cleanNewUser } = useContext(MainContext);

    const onSubmit = data => {

        registerNewUser(data)

    }

    if (newUser === "creado") {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                name='nombre'
                ref={register({
                    required: {
                        value: true,
                        message: "Campo obligatorio"
                    },
                    maxLength: {
                        value: 30,
                        message: "El largo máximo es 30 caracteres"
                    },
                    pattern: {
                        value: /^[A-Za-zÑñáéíóúÁÉÍÓÚ0-9 _]*$/,
                        message: "Caracteres no permitidos"
                    }
                })}
            />
            {errors.nombre && errors.nombre.message && <p>{errors.nombre.message}</p>}

            <input
                name='email'
                ref={register({
                    required: {
                        value: true,
                        message: "Campo obligatorio"
                    },
                    maxLength: {
                        value: 30,
                        message: "El largo máximo es 30 caracteres"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: "Email no válido"
                    }
                })}
            />
            {errors.email && errors.email.message && <p>{errors.email.message}</p>}
            {newUser == "repetido" && <p>Esta cuenta ya existe</p>}

            <input name='password'
                ref={register({
                    required: {
                        value: true,
                        message: "Campo obligatorio"
                    },
                    maxLength: {
                        value: 30,
                        message: "El largo máximo es 30 caracteres"
                    },
                    pattern: {
                        value: /^[A-Za-zÑñáéíóúÁÉÍÓÚ0-9 _]*$/,
                        message: "Caracteres no permitidos"
                    }
                })}
            />
            {errors.password && errors.password.message && <p>{errors.password.message}</p>}

            <input type='submit' />
        </form>
    )
}