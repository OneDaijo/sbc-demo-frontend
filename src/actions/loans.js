import apiClient from './helpers/apiClient';

export function loadLoans() {
  return {
    type: 'LOANS_LOAD',
    payload: apiClient.get('/loans'),
  };
}

export default {
  loadLoans,
};
