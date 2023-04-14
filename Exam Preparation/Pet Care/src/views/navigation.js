import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../data/auth.js";
import { getUserData } from "../util.js";

const nav = document.querySelector('header');

const navigationTemplate = (hasUser) => html `
<nav>
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>
    <!--Users and Guest-->
    <li class="user-and-guest"><a href="/">Home</a></li>
    <li class="user-and-guest"><a href="/dashboard">Dashboard</a></li>
    <!--Only Guest-->
    ${!hasUser ? html `<li class="guest"><a href="/login">Login</a></li>
    <li class="guest"><a href="/register">Register</a></li>`
    : html `<!--Only Users-->
    <li class="user"><a href="/create">Create Postcard</a></li>
    <li @click=${onLogout} class="user"><a href="/logout">Logout</a></li>` }
</ul>
</nav>`

export function updateNavigation() {
    const user = getUserData();
    render(navigationTemplate(user), nav);
}
 
function onLogout() {
    logout();
    updateNavigation();
    page.redirect('/');
}