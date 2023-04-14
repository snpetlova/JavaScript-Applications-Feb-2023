import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMeme, getMemeById } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";


const editTemplate = (meme, onSubmit) => html `
<section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value="${meme.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;

export async function editPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    ctx.render(editTemplate(meme, createSubmitHandler(onSubmit)));

    async function onSubmit(data, form) {
        if(Object.values(data).some((x) => x === '')) {
            return alert ('All fields are required!');
        }
        await editMeme(memeId, meme);
        form.reset();
        ctx.page.redirect(`/memes/${memeId}`);

    }
}