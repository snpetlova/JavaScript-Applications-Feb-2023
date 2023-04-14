import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePetById, donationPet, getPetById, getTotalDonations, isDonatedUser } from "../data/auth.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, onDelete, donations, showDonateBtn, donate) => html`
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src="${pet.image}">
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${donations}$</h4>
        </div>
        ${petControls(pet, isOwner, onDelete)}
        ${donationControls(showDonateBtn, donate)}
    </div>
</div>
</section>`;

const petControls = (pet, isOwner, onDelete) => {
    if (isOwner) {
        return html `<div class="actionBtn">
        <a href="/edit/${pet._id}" class="edit">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
    </div>`
    } else {
        return null;
    }
}

const donationControls = (showDonateBtn, donate) => {
    if (showDonateBtn) {
        return html`<div class="actionBtn">
        <a @click=${donate} href="javascript:void(0)" class="donate">Donate</a>
    </div>`
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    const userId = getUserData()?._id;   
    const isOwner = pet._ownerId === userId;
    const donations = await getTotalDonations(petId);
    const myDonations = await isDonatedUser(petId, userId);
    const showDonateBtn = !isOwner && !myDonations && userId;

    ctx.render(detailsTemplate(pet, isOwner, onDelete, donations, showDonateBtn, donate));

    async function donate() {
        await donationPet(petId);
        ctx.page.redirect(`/details/${petId}`)
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deletePetById(petId);
            ctx.page.redirect('/');
        }
    }
}