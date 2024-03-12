// apiService.js
import axios from 'axios';
import { BANK_BASE_URL, GET_BANK_URL } from '../common/common';


const apiBankService = axios.create({
    baseURL: BANK_BASE_URL,
    timeout: 10000,
});
apiBankService.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);
apiBankService.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);
export const getBanks = () => {
    return apiBankService.get(GET_BANK_URL)
}
