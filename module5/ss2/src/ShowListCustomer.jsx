import React from "react";

function ShowListCustomer() {
    const listCustomer = [
        {id: 1, code: "c-001", name: "Hoang", address: "DN", category: "VIP"},
        {id: 2, code: "c-002", name: "Hoang2", address: "DN", category: "VIP"},
        {id: 3, code: "c-003", name: "Hoang3", address: "DN", category: "VIP"},
    ];

    return (<>
        <table>
            <thead>
            <th>ID</th>
            <th>CODE</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>CATEGORY</th>
            </thead>
            <tbody>
            {listCustomer.map((e) => (
                <tr>
                    <td key={e.id}>{e.id}</td>
                    <td>{e.code}</td>
                    <td>{e.name}</td>
                    <td>{e.address}</td>
                    <td>{e.category}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>)
}

export default ShowListCustomer;
