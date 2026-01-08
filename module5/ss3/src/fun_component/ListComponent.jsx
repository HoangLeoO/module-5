import {useState} from "react";

function ListComponent() {
    const [data, setData] = useState([]);

    return (<>
        <table>
            <thead>
            <th>Id</th>
            <th></th>
            <th></th>
            <th></th>
            </thead>
        </table>
    </>);
}