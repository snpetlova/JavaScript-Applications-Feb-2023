const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    document.querySelector('.email span').textContent = userData.email;
    document.querySelector('#guest').style.display = 'none';
    document.querySelector('#addForm .add').disabled = false;
    loadData();
} else {
    document.getElementById('user').style.display = 'none';
}

//Load all data
document.querySelector('.load').addEventListener('click', loadData);

//Create catch
document.querySelector('#addForm').addEventListener('submit', onSubmit);

//Button delegation - DELETE & UPDATE
document.querySelector('#main').addEventListener('click', buttonsDelegation);

//LogOut
document.querySelector('#logout').addEventListener('click', logOut);


//LOGOUT FUNC
async function logOut() {
    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': userData.token,
        },
    });

    localStorage.clear();
    document.querySelector('#logout').style.display = 'none';
    document.querySelector('#addForm .add').disabled = true;
    document.querySelector('#guest').style.display = 'block';
}

//BUTTONS DELEGATION FUNC
function buttonsDelegation(ev) {
    const currentBtn = ev.target.textContent;
    const id = ev.target.id === "" ? ev.target.dataset.id : ev.target.id;
    const currCatchElem = ev.target.parentElement;

    if (currentBtn === 'Delete') {
        deleteCatch(id);
    } else if (currentBtn === 'Update') {
        updateCatchElement(id, currCatchElem);
    }
}

//DELETE CATCH FUNC
async function deleteCatch(id) {
    await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.token,
        },
    });
    loadData();
}

//UPDATE CATCH FUNC
async function updateCatchElement(id, currCatchElem) {
    let [angler, weight, speices, location, bait, captureTime] = currCatchElem.querySelectorAll('input');

    try {
        const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': userData.token,
            },
            body: JSON.stringify({
                angler: angler.value,
                weight: +weight.value,
                speices: speices.value,
                location: location.value,
                bait: bait.value,
                captureTime: +captureTime.value,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch (error) {
        alert(error.message);
    }
    loadData();
}

//ON SUBMIT FUNC
async function onSubmit(ev) {
    ev.preventDefault();

    if (!userData) {
        window.location = './login.html';
        return;
    }

    const formData = new FormData(ev.target);

    const data = [...formData.entries()].reduce(
        (acc, [k, v]) => Object.assign(acc, { [k]: v }),
        {}
    );

    try {
        if (Object.values(data).some((x) => x === ""))
            throw new Error('Must fill all fields!');

        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': userData.token,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        loadData();

        ev.target.reset();

    } catch (error) {
        alert(error.message);
    }
}

//LOAD DATA FUNC
async function loadData() {
    const response = await fetch("http://localhost:3030/data/catches");
    const data = await res.json();
    document.getElementById("catches").replaceChildren(...data.map(createCatch));
}

//CREATE CATCH FUNC
function createCatch(data) {
    const isDisabled = userData && data._ownerId === userData.id ? false : true;
    const catches = createElement(
        'div',
        { class: 'catch'},
        createElement('label', {}, 'Angler'),
        createElement('input', {
            type: 'text',
            class: 'angler',
            value: data.angler,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Weight"),
    createElement("input", {
      type: "text",
      class: "weight",
      value: data.weight,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Species"),
    createElement("input", {
      type: "text",
      class: "species",
      value: data.species,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Location"),
    createElement("input", {
      type: "text",
      class: "location",
      value: data.location,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Bait"),
    createElement("input", {
      type: "text",
      class: "bait",
      value: data.bait,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Capture Time"),
    createElement("input", {
      type: "number",
      class: "captureTime",
      value: data.captureTime,
      disabled: isDisabled,
    }),
    createElement(
        'button',
        { class: 'update', id: data._id, disabled: isDisabled},
        'Update'
    ),
    createElement(
        'button',
        { class: 'delete', id: data._id, disabled: isDisabled},
        'Delete'
    )
    );
    return catches;
}

//CREATE ELEMENT FUNC
function createElement(type, attr, ...content) {
    const element = document.createElement(type);

    for (const item in attr) {
        if (item === 'class') {
            element.classList.add(attr[item]);
        } else if (item === 'disable') {
            element.disabled = attr[item];
        } else {
            element[item] = attr[item];
        }
    }

    for (let item of content) {
        if (typeof item === 'string' || typeof item === 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}