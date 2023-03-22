import { html, render } from "./node_modules/lit-html/lit-html.js";

document.getElementById('btnLoadTowns').addEventListener('click', onClick);

function onClick(e) {
    e.preventDefault();

    let input = document.querySelector('#towns');
    const data = input.value.split(', ');
    renderComponentTowns(data);
    input.value = '';
}

const renderComponentTowns = (data) => {
    const root = document.getElementById('root');
    render(cardTemplate(data), root);
}

const cardTemplate = (data) => html `
<ul>
${data.map((item) => html `<li>${item}</li>`)}
</ul>`