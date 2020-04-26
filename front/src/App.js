import React from 'react';
import MainContextProvider from './Contexts/MainContext';

import Main from './Componentes/Main';

function App() {

    return (
        <MainContextProvider>
            <div>
                <Main />
            </div>
        </MainContextProvider>
    );

}

export default App;
