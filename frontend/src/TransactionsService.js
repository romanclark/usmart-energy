import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TransactionsService {

    // constructor(){}

    getTransactions() {
        const url = `${API_URL}/api/transactions/`;
        return axios.get(url).then(response => response.data);
    }
    getTransactionsByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getTransaction(transaction_id) {
        const url = `${API_URL}/api/transactions/${transaction_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteTransaction(transaction) {
        const url = `${API_URL}/api/transactions/${transaction.transaction_id}`;
        return axios.delete(url);
    }
    createTransaction(transaction) {
        const url = `${API_URL}/api/transactions/`;
        return axios.post(url, transaction);
    }
    updateTransaction(transaction) {
        const url = `${API_URL}/api/transactions/${transaction.transaction_id}`;
        return axios.put(url, transaction);
    }
}