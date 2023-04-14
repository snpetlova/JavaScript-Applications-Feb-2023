import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPets } from "../data/auth.js";

//TODO Replace with actual layout
export const layoutTemplate = (pets) => html `
<section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
            ${pets.length == 0 ? html `<div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`
    : pets.map(petsTemplate)}
    </div>
        </section>`;
        
        
       const petsTemplate = (p) => html `<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${p.image}">
    </article>
    <h2 class="name">${p.name}</h2>
    <h3 class="breed">${p.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${p._id}">Details</a>
    </div>`
;

export async function dashboardPage(ctx) {
    const pets = await getAllPets();
    ctx.render(layoutTemplate(pets));
}