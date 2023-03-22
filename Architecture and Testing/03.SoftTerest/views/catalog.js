import { getAllIdeas } from "../api/data.js";

const section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetailsSelection);

let ctx = null;

export async function showCatalog(context) {
    ctx = context;
    context.showSection(section);

    const ideas = await getAllIdeas();
    if (ideas.length === 0) {
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    } else {
        section.replaceChildren(...ideas.map(createIdea));
    }
}

function createIdea(idea) {
    const div = document.createElement('div');
    div.classList = 'card overflow-hidden current-card details';
    div.style.width = '20rem';
    div.style.height - '18rem';

    div.innerHTML = `
    <div class="card-body">
      <p class="card-text">${idea.title}</p>
    </div>
<img class="card-image" src="${idea.imgURL}" alt="Card image cap"/>
<a data-id=${idea._id} class="btn" href="/details">Details</a>`
return div;
}

function onDetailsSelection(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const id = e.target.dataset.id;
        ctx.goTo(`/details`, id);
    }
}