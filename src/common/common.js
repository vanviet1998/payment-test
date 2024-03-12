export const BANK_BASE_URL = 'https://api.vietqr.io/v2';
export const GET_BANK_URL = '/banks'

export const FAKE_BASE_URL = 'https://65eef8f2ead08fa78a4f6931.mockapi.io/api'
export const DETAIL_PAYMENT_URL = '/detail/payment-detail'


export const replaceNumberToAmount = (value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
