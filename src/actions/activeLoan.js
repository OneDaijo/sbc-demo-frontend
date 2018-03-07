import apiClient from './helpers/apiClient';

export function requestLoan(loanDetails) {
  return {
    type: 'ACTIVE_LOAN_REQUEST',
    payload: apiClient.post('/loan-request', { data: loanDetails }),
  };
}

export function loadActiveLoan() {
  return {
    type: 'ACTIVE_LOAN_LOAD',
    payload: apiClient.get('/active-loan'),
  };
}

export function choosePickupLocation(pickupLocation) {
  return {
    type: 'ACTIVE_LOAN_CHOOSE_PICKUP',
    payload: apiClient.put('/active-loan', { data: { pickupLocation } }),
  };
}

export function cancelActiveLoan() {
  return {
    type: 'ACTIVE_LOAN_CANCEL',
    payload: apiClient.delete('/active-loan'),
  };
}

export function selectLoanTerm(termsId) {
  const data = {
    selectedTerm: termsId,
  };

  return {
    type: 'ACTIVE_LOAN_TERMS_SELECT',
    payload: apiClient.put('/active-loan', { data }),
  };
}

export function repayLoan() {
  return {
    type: 'ACTIVE_LOAN_REPAY',
    payload: apiClient.post('/repay'),
  };
}

export function closeLoan() {
  return {
    type: 'ACTIVE_LOAN_CLOSE',
    payload: Promise.resolve(),
  };
}

export default {
  requestLoan,
  choosePickupLocation,
  loadActiveLoan,
  selectLoanTerm,
  cancelActiveLoan,
  repayLoan,
  closeLoan,
};
