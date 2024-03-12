// apiService.js
import axios from 'axios';
import {DETAIL_PAYMENT_URL, FAKE_BASE_URL } from '../common/common';


const fakeApiService = axios.create({
    baseURL: FAKE_BASE_URL,
    timeout: 10000,
});
fakeApiService.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);
fakeApiService.interceptors.response.use(
    response => {
        return response?.data
    },
    error => {
        return Promise.reject(error);
    }
);
export const getDetailPayment = () => {
    return fakeApiService.get(DETAIL_PAYMENT_URL)
}

