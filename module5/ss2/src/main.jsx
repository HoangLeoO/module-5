import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShowListCustomer from './ShowListCustomer.jsx'
import Login from "./Login.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*<App/>*/}
        <ShowListCustomer/>
        {/*<Login/>*/}
    </StrictMode>,
)
