import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class AssetsService {

    // constructor() { }

    getAssets() {
        const url = `${API_URL}/api/assets/`;
        return axios.get(url).then(response => response.data);
    }

    getAssetsByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getAsset(asset_id) {
        const url = `${API_URL}/api/assets/${asset_id}`;
        return axios.get(url).then(response => response.data);
    }

    deleteAsset(asset) {
        const url = `${API_URL}/api/assets/${asset.asset_id}`;
        return axios.delete(url);
    }

    createAsset(asset) {
        const url = `${API_URL}/api/assets/`;
        return axios.post(url, asset);
    }

    updateAsset(asset) {
        const url = `${API_URL}/api/assets/${asset.asset_id}`;
        return axios.put(url, asset);
    }
}