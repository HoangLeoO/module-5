import React from "react";
import './App.css';

function App() {
    // danh sach thanh pho
    const list = ['HN', 'DN', 'HP'];
    const h1 = React.createElement("h1", null, "Danh sach thanh pho");
    const li = list.map(e =>
        React.createElement("li", null, e)
    );
    const showList = React.createElement("ul", null, h1,...li);
    return showList;
}

export default App
