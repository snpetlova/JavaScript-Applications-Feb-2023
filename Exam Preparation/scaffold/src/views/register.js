import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

//TODO Replace with actual view
const registerTemplate = (onRegister) => html `
<h1>Register Page</h1>
<form @submit=${onRegister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="password" name="repass"></label>
    <button>Register</button>
</form>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO Change user object based on requierments
    async function onRegister({email, password, repass}, form) {
        if (email == '' || password == ''){
            return alert('All fields are required!');
        }
        if (password != repass) {
            return alert('Passwords don\'t match!')
        }

        await register(email, password);
        form.reset();
        //TODO Use redirect location from requierments
        ctx.page.redirect('/')
    }
}