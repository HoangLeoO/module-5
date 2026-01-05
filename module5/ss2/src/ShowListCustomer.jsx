import React from "react";

function ShowListCustomer() {
    const listCustomer = [
        { id: 1, code: "c-001", name: "Hoang", address: "DN", category: "VIP" },
        { id: 2, code: "c-002", name: "Hoang2", address: "DN", category: "VIP" },
        { id: 3, code: "c-003", name: "Hoang3", address: "DN", category: "VIP" },
    ];

    const head = React.createElement("h1", null, "DANH SACH KHACH HANG");

    const thead = React.createElement(
        "thead",
        null,
        React.createElement("tr", null, [
            React.createElement("th", null, "STT"),
            React.createElement("th", null, "CODE"),
            React.createElement("th", null, "NAME"),
            React.createElement("th", null, "ADDRESS"),
            React.createElement("th", null, "CATEGORY"),
        ])
    );

    const tbody = React.createElement(
        "tbody",
        null,
        listCustomer.map((e, i) =>
            React.createElement("tr", { key: e.id }, [
                React.createElement("td", null, i + 1),
                React.createElement("td", null, e.code),
                React.createElement("td", null, e.name),
                React.createElement("td", null, e.address),
                React.createElement("td", null, e.category),
            ])
        )
    );

    const table = React.createElement("table", { border: 1, cellPadding: 5 }, thead, tbody);

    return React.createElement("div", null, head, table);
}

export default ShowListCustomer;
