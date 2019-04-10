import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DevicesService{

    constructor(){}


    getDevices() {
        const url = `${API_URL}/api/devices/`;
        return axios.get(url).then(response => response.data);
    }  
    getDevicesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getDevice(device_id) {
        const url = `${API_URL}/api/devices/${device_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteDevice(device){
        const url = `${API_URL}/api/devices/${device.device_id}`;
        return axios.delete(url);
    }
    createDevice(device){
        const url = `${API_URL}/api/devices/`;
        return axios.post(url,device);
    }
    updateDevice(device){
        const url = `${API_URL}/api/devices/${device.device_id}`;
        return axios.put(url,device);
    }
}