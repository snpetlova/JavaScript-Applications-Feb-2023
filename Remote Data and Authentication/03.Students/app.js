const table = document.querySelector('#results tbody');
const form = document.getElementById('form');
const sumbitBtn = document.getElementById('submit');

const url = 'http://localhost:3030/jsonstore/collections/students';

fetch(url)
    .then(res => res.json())
    .then(data => {
        table.innerHTML = '';

        for (const student of Object.entries(data)) {
            table.innerHTML += `<tr>
        <td>${student[1].firstName}</td>
        <td>${student[1].lastName}</td>
        <td>${student[1].facultyNumber}</td>
        <td>${student[1].grade}</td>`
        }
    })

form.addEventListener('submit', create)

function create(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.currentTarget);

    const isEmpty = formData.get('firstName') !== '' &&
        formData.get('lastName') !== '' &&
        formData.get('facultyNumber') !== '' &&
        formData.get('grade') !== '';

        if (isEmpty) {
            fetch (url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'firstName': formData.get('firstName'),
                    'lastName': formData.get('lastName'),
                    'facultyNumber': formData.get('facultyNumber'),
                    'grade': formData.get('grade'),
                })
            })
        }
}



