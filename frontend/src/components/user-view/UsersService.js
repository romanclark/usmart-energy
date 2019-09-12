import axios from 'axios';
import { useAuth0 } from "./react-auth0-wrapper";
const API_URL = 'https://localhost:443';

// The class provides methods that interface with the REST API backend
// Axios is the HTTP client we'll use to make API calls

export default class UsersService {

    constructor() { 
        this.state = {
            token: null,
        };
    }

    async getToken() {
        const { getTokenSilently } = useAuth0();
        try {
            const token = await getTokenSilently();
            this.setState({
                token,
            });
        } catch (error) {
            console.error(error);
        }
    }

    getUsers() {
        const {token} = this.state;
        const url = `${API_URL}/api/users/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getUsersByURL(link) {
        const {token} = this.state;
        const url = `${API_URL}${link}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getUser(user_id) {
        const {token} = this.state;
        const url = `${API_URL}/api/users/${user_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    deleteUser(user) {
        const {token} = this.state;
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.delete(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }

    createUser(user) {
        const {token} = this.state;
        const url = `${API_URL}/api/users/`;
        return axios.post(url, user, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }

    updateUser(user) {
        const {token} = this.state;
        console.log(JSON.stringify(user))
        const url = `${API_URL}/api/users/${user.user_id}`;
        return axios.put(url, user, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }
}