function attachEvents() {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const phoneBook = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const urlPhonebook = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', load);
    createBtn.addEventListener('click', create);

    async function create() {
        if (!personInput.value || !phoneInput.value) {
            return alert('Please fill all fields!')
        }

        await fetch(urlPhonebook, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                person: personInput.value,
                phone: phoneInput.value,
            })
        });
        personInput.value = '';
        phoneInput.value = '';
        loadBtn.click();
    }

    async function load() {
        const res = await fetch(urlPhonebook);
        const data = await res.json();

        Object.values(data).forEach((el) => {
            const li = document.createElement('li');
            li.textContent = `${el["person"]}: ${el["phone"]}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute(`id`, el["_id"]);
            deleteBtn.textContent = 'Delete';

            li.appendChild(deleteBtn);
            phoneBook.appendChild(li);

            deleteBtn.addEventListener('click', async (e) => {
                const userID = e.target.id;
                const targetURL = `${urlPhonebook}/${userID}`;

                await fetch(targetURL, {
                    method: 'DELETE',
                });
                e.target.parentNode.remove();
            })
        })

    }
}

attachEvents();