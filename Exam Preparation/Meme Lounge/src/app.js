import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

//TODO change render root depending on project HTLM structure
const root = document.querySelector('main');
document.getElementById('logoutBtn', logoutAction);

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/memes', catalogPage);
page('/memes/:id', detailsPage)
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/create', createPage);
page('/edit/:id', editPage);
page('/my-profile', profilePage);


updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    ctx.updateNav = updateNav;

    next();
}

//TODO Inject dependencies
function renderView(content) {
    const userData = getUserData();
    render(content, root);
}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function logoutAction(ctx) {
    logout();
    updateNav();
    ctx.page.redirect('/');
}