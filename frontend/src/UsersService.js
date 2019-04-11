import axios from 'axios';
const API_URL = 'http://localhost:8000';

// The class provides methods that interface with the REST API backend
// Axios is the HTTP client we'll use to make API calls

export default class UsersService {

    constructor() { }

    getUsers() {
        const url = `${API_URL}/api/users/`;
        return axios.get(url).then(response => response.data);
    }

    getUsersByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getUser(user_id) {
        const url = `${API_URL}/api/users/${user_id}`;
        return axios.get(url).then(response => response.data);
    }

    deleteUser(user) {
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.delete(url);
    }

    createUser(user) {
        const url = `${API_URL}/api/users/`;
        return axios.post(url, user);
    }

    updateUser(user) {
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.put(url, user);
    }
}