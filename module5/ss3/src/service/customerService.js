const listCustomer = [
    {id: 1, name: 'c1'},
    {id: 2, name: 'c2'},
    {id: 3, name: 'c3'},
    {id: 4, name: 'c4'},
    {id: 5, name: 'c5'},
    {id: 6, name: 'c6'}
];

function getAll() {
    return listCustomer;
}

function deleteByCustomer(customer) {
    for (let i = 0; i < listCustomer.length; i++) {
        if (i == customer.id - 1) {
            listCustomer.splice(i, 1)
        }
    }
}

function save({id, name}) {
    listCustomer.push({id,name})
}

export {getAll,deleteByCustomer,save}