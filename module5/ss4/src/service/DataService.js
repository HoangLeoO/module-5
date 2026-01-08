const players = [
    {
        id: 1,
        playerCode: "PL001",
        name: "Nguyễn Văn A",
        birthDate: "1998-05-12",
        transferValue: 25000000, // USD
        position: "Tiền đạo"
    },
    {
        id: 2,
        playerCode: "PL002",
        name: "Trần Văn B",
        birthDate: "1996-11-03",
        transferValue: 18000000,
        position: "Tiền vệ"
    },
    {
        id: 3,
        playerCode: "PL003",
        name: "Lê Văn C",
        birthDate: "2000-02-21",
        transferValue: 12000000,
        position: "Hậu vệ"
    }
];

function getAll() {
    return [...players];
}

function findPlayerById(id) {
    return players.find(p => p.id === id);
}

function findPlayerByName(keyword) {
    return players.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

function addPlayer(player) {
    players.push(player);
}

function updatePlayer(id, updatedData) {
    const player = players.find(p => p.id === id);
    if (player) {
        Object.assign(player, updatedData);
    }
}

function deletePlayerById(id) {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
        players.splice(index, 1);
    }
}

export {
    getAll,
    findPlayerById,
    findPlayerByName,
    addPlayer,
    updatePlayer,
    deletePlayerById
};