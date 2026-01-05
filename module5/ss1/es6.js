const isPrime = (num) => {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

const arr = [1, 2, 3, 4, 5];
const arrNew = arr.filter((e) => isPrime(e));
console.log(arrNew);


const person = {
    firstName: 'Hoang',
    lastName: 'Le',
    age: 25,
    gender: 'male',
    occupation: 'developer',
    nationality: 'Viet Nam',
    city: 'Dang Nang',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['Vietnamese', 'English'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Hava'
    }
};
const {firstName,lastName,age,education } = person;
const newUser = {firstName,lastName,age,education} ;
console.log(newUser);

function getInfo(obj) {
    const {firstName = "Quan",education: {degree}} = obj
    console.log(firstName + " " + degree)
}
const user2 = {education}
getInfo(user2);
