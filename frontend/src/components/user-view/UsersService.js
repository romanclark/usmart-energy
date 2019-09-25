import axios from 'axios';
const API_URL = 'https://localhost:8000';

// The class provides methods that interface with the REST API backend
// Axios is the HTTP client we'll use to make API calls

export default class UsersService {
    getUsers(token) {
        const url = `${API_URL}/api/users/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }
    getUsersByURL(link, token) {
        const url = `${API_URL}${link}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }
    getUser(user_id, token) {
        const url = `${API_URL}/api/users/${user_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }
    deleteUser(user, token) {
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.delete(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }
    createUser(user, token) {
        const url = `${API_URL}/api/users/`;
        return axios.post(url, user, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }
    updateUser(user, token) {
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.put(url, user, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }
}