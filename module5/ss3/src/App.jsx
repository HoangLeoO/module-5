import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCustomerComponent from "./componnet_class/ListCustomerComponent.jsx";
import DeleteComponent from "./componnet_class/DeleteComponent.jsx";
import AddCustomerComponent from "./componnet_class/AddCustomerComponent.jsx";
import TodoApp from "./componnet_class/TodoApp.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/*<ListCustomerComponent/>*/}
            <TodoApp/>
        </>
    )
}

export default App
