import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMeme, getMemeById } from "../data/auth.js";
import { getUserData } from "../util.js";

const detailsTemplate = (meme, isOwner, onDelete) => html `
<section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>
                    ${isOwner ? html `<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`
                    : ''}      
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    const userData = getUserData()?._id;
    const isOwner = meme._ownerId === userData;
    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm(`Are you sure?`);
        if (confirmed) {
            await deleteMeme(memeId);
            ctx.page.redirect('/memes');
        }
    }
}