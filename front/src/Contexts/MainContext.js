import React, { createContext, useState } from 'react';
import axios from 'axios';

export const MainContext = createContext();

const MainContextProvider = (props) => {

    const [selectedUser, setUser] = useState(null);
    const setSelectedUser = (user) => {
        axios.post('api/login', { username: user.nombre, password: user.password })
            .then((res) => {
                if (res.data.id) setUser({ nombre: res.data.nombre, id: res.data.id })
                else {
                    setUser(null)
                    console.log(res)
                }
            })
    }

    return (
        <MainContext.Provider value={{ selectedUser, setSelectedUser }}>
            {props.children}
        </MainContext.Provider>
    );
}

export default MainContextProvider;
