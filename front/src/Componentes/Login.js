import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MainContext } from '../Contexts/MainContext';


export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const { setSelectedUser, selectedUser } = useContext(MainContext);

    const onSubmit = data => {

        setSelectedUser(data)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name='email' ref={register({
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
            })} />
            {errors.email && errors.email.message && <p>{errors.email.message}</p>}

            <input name='password' ref={register({
                required: {
                    value: true,
                    message: "Campo obligatorio"
                }
            })} />
            {errors.password && errors.password.message && <p>{errors.password.message}</p>}

            <input type='submit' />

        </form>
    )
}