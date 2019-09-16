import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TransactionsService {
    // constructor(){}
    getMarketPeriodStats() {
        const url = `${API_URL}/api/transactions_stats/`;
        return axios.get(url).then(response => response.data);
    }

    getFilteredTransactions(startTime, endTime, is_with_grid, purchased) {
        const url = `${API_URL}/api/filter_transactions_list/${startTime}/${endTime}/${is_with_grid}/${purchased}`;
        return axios.get(url).then(response => response.data);
    }

    getMostRecentTransactions(is_with_grid) {
        const url = `${API_URL}/api/market_period_transactions/${is_with_grid}`;
        return axios.get(url).then(response => response.data);    
    }
    getTransactions() {
        const url = `${API_URL}/api/transactions/`;
        return axios.get(url).then(response => response.data);
    }
    getTransactionsByUser(user) {
        const url = `${API_URL}/api/user_transactions/${user}`;
        return axios.get(url).then(response => response.data);
    }
    getMonthlyTransactionsByUser(user, month) {
        const url = `${API_URL}/api/monthly_user_transactions/${user}/${month}`;
        return axios.get(url).then(response => response.data);
    }
    getTransactionsTotal() {
        const url = `${API_URL}/api/transactions_total/`;
        return axios.get(url).then(response => response.data);
    }
    getTransactionsTotalByMonth(month) {
        const url = `${API_URL}/api/transactions_total/${month}`;
        return axios.get(url).then(response => response.data);
    }
    getDailyEnergyTotalForMonth(month) {
        const url = `${API_URL}/api/energy_total/${month}`;
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