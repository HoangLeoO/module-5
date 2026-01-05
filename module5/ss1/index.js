const courses = [
    {id: 1, title: 'ReactJS Tutorial', rating: 4.2},
    {id: 2, title: 'Angular Tutorial', rating: 2.5},
    {id: 3, title: 'VueJS Tutorial', rating: 3.8},
    {id: 4, title: 'Java Tutorial', rating: 4},
    {id: 5, title: 'JavaScript Tutorial', rating: 3.5},
];

const addedCourses = [
    {
        id: 6,
        title: 'PHP Tutorial',
        rating: 3,
    },
    {
        id: 7,
        title: 'C# Tutorial',
        rating: 2,
    },
    {
        id: 8,
        title: 'Docker Tutorial',
        rating: 3.8,
    }
];

const newArr = courses.filter(e => e.rating >= 4);
console.log(newArr);

function showList() {
    let show = '';
    newArr.forEach(e => {
        show += `
            <div>
                <p><strong>ID:</strong> ${e.id}</p>
                <p><strong>Title:</strong> ${e.title}</p>
                <p><strong>Rating:</strong> ${e.rating}</p>
                <hr>
            </div>
        `;
    });
    const container = document.getElementById('course-list');
    if (container) {
        container.innerHTML = show;
    }else{
        alert(null);
    }
};


const newArr2 = [...courses,...addedCourses]
console.log(newArr2)
