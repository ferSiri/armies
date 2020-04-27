import React, { createContext, useState } from 'react';
import axios from 'axios';

export const MainContext = createContext();

const MainContextProvider = (props) => {


    const [selectedUser, setUser] = useState(null);
    const setSelectedUser = (user) => {
        axios.post('api/login', { username: user.email, password: user.password })
            .then((res) => {
                if (res.data.id) setUser({ nombre: res.data.nombre, email: res.data.email, id: res.data.id })
                else {
                    setUser(null)
                }
            })
    }
    const [newUser, setNewUser] = useState(null);
    const registerNewUser = (user) => {
        axios.post('api/signup', { nombre: user.nombre, email: user.email, password: user.password })
            .then((res) => {
                if (res.data.id) {
                    setNewUser("creado")
                } else {
                    setNewUser("repetido")
                }
            })
    }
    const cleanNewUser = () => {
        setNewUser(null)
    }
    return (
        <MainContext.Provider value={{ selectedUser, setSelectedUser, newUser, registerNewUser, cleanNewUser }}>
            {props.children}
        </MainContext.Provider>
    );
}

export default MainContextProvider;
