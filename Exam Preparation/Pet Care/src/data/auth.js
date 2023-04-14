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

export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}

export async function getAllPets() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name')
}

export async function createPet(item) {
    return post('/data/pets', item)
}

export async function getPetById(id) {
    return get(`/data/pets/${id}`);
}

export async function deletePetById(id){
    return del(`/data/pets/${id}`);
}

export async function editPet(id, item) {
    return put(`/data/pets/${id}`, item)
}

export async function donationPet(petId) {
    return post(`/data/donation`, petId)
}

export async function getTotalDonations(petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
}

export async function isDonatedUser(petId, userId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
