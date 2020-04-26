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
            <input name='nombre' ref={register({ required: true, minLength: 1 })} />
            {errors.nombre && <p>Campo obligatorio</p>}
            <input name='password' ref={register({ required: true, minLength: 1 })} />
            {errors.password && <p>Campo obligatorio</p>}
            <input type='submit' />
            <p>Registrarme...</p>
        </form>
    )
}