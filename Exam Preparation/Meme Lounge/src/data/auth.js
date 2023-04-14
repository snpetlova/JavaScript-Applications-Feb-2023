import { clearUserData, setUserData } from "../util.js";
import { del, get, post, put } from "./api.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

//TODO Change user object according to project requirements

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}

export async function register(username, email, password, gender) {
    const result = await post(endpoints.register, { username, email, password, gender });
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeById(id) {
    return get(`/data/memes/${id}`)
}

export async function createMeme(meme) {
    return post('/data/memes', meme);
}

export async function deleteMeme(id) {
    return del(`/data/memes/${id}`)
}

export async function editMeme(id, meme) {
    return put(`/data/memes/${id}`, meme)
}

export async function getMyMemes(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}