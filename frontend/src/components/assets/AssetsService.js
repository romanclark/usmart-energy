import axios from 'axios';
const API_URL = 'https://localhost:8000';

export default class AssetsService {

    // constructor() { }

    getAssets(token) {
        const url = `${API_URL}/api/assets/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getUserByAsset(asset_id, token) {
        const url = `${API_URL}/api/asset_user/${asset_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getAssetsByUser(owner_id, token) {
        const url = `${API_URL}/api/user_assets/${owner_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getAssetsByURL(link, token) {
        const url = `${API_URL}${link}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    getAsset(asset_id, token) {
        const url = `${API_URL}/api/assets/${asset_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.data);
    }

    deleteAsset(asset, token) {
        const url = `${API_URL}/api/assets/${asset.asset_id}`;
        return axios.put(url, asset, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }

    createAsset(asset, token) {
        const url = `${API_URL}/api/assets/`;
        return axios.post(url, asset, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }

    updateAsset(asset, token) {
        const url = `${API_URL}/api/assets/${asset.asset_id}`;
        return axios.put(url, asset, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    }
}