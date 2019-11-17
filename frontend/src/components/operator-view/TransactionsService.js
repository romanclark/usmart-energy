import axios from 'axios';
const API_URL = 'https://usmart-energy.tk';

export default class TransactionsService {
    // constructor(){}
    getMarketPeriodStats(token) {
        const url = `${API_URL}/api/transactions_stats/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getFilteredTransactions(startTime, endTime, is_with_grid, purchased, token) {
        const url = `${API_URL}/api/filter_transactions_list/${startTime}/${endTime}/${is_with_grid}/${purchased}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    // getMostRecentTransactions(is_with_grid, token) {
    //     const url = `${API_URL}/api/market_period_transactions/${is_with_grid}`;
    //     return axios.get(url, {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     }).then(response => response.data);
    // }
    getAllMostRecentTransactions(is_with_grid, token) {
        const url = `${API_URL}/api/all_market_period_transactions/${is_with_grid}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getAllTransactions(token) {
        const url = `${API_URL}/api/all_transactions/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getTransactions(token) {
        const url = `${API_URL}/api/transactions/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getUserTransactions(user_id, token) {
        const url = `${API_URL}/api/user_transactions/${user_id}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    // getTransactionDataByUser(user, token) {
    //     const url = `${API_URL}/api/user_transaction_data/${user}`;
    //     return axios.get(url, {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     }).then(response => response.data);
    // }
    getMonthlyTransactionsByUser(user, month, token) {
        const url = `${API_URL}/api/monthly_user_transactions/${user}/${month}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getTransactionsTotal(token) {
        const url = `${API_URL}/api/transactions_total/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getTransactionsTotalByMonth(month, token) {
        const url = `${API_URL}/api/transactions_total/${month}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getDailyEnergyTotalForMonth(month, token) {
        const url = `${API_URL}/api/energy_total/${month}`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getEnergyDemandForPriorDay(token) {
        const url = `${API_URL}/api/prior_day_demand/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getEnergySupplyForPriorDay(token) {
        const url = `${API_URL}/api/prior_day_supply/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getDailyEnergyQueue(token) {
        const url = `${API_URL}/api/daily_energy_queue/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    controlMarketplace(command, token) {
        const url = `${API_URL}/api/marketplace/${command}`;
        return axios.put(url, command, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    runMarketplace(market_period, token) {
        const url = `${API_URL}/api/run_market/${market_period}`;
        return axios.put(url, market_period, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    resetMarketplace(empty, token) {
        const url = `${API_URL}/api/reset_market/`;
        return axios.put(url, empty, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    getMarketTime(token) {
        const url = `${API_URL}/api/marketplace/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
    isMarketRunning(token) {
        const url = `${API_URL}/api/marketplace_check/`;
        return axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.data);
    }
}