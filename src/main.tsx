import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {store} from "./store/rootReducer"
import {Provider} from "react-redux"


createRoot(document.getElementById('root')!).render( //guaranteeing this is not null????
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
