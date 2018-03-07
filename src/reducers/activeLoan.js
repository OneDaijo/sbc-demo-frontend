const initialState = {
  loading: false,
  loan: {},
  error: null,
  requestLoading: false,
  requestError: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Loan
    case 'ACTIVE_LOAN_LOAD_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case 'ACTIVE_LOAN_LOAD_FULFILLED': {
      return {
        ...state,
        loan: action.payload || {},
        loading: false,
      };
    }

    case 'ACTIVE_LOAN_LOAD_REJECTED': {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }

    // Loan Request
    case 'ACTIVE_LOAN_REQUEST_PENDING': {
      return {
        ...state,
        loan: {},
        requestLoading: true,
        requestError: null,
      };
    }

    case 'ACTIVE_LOAN_REQUEST_FULFILLED': {
      const newLoan = action.payload;

      return {
        ...state,
        requestLoading: false,
        loan: newLoan,
      };
    }

    case 'ACTIVE_LOAN_REQUEST_REJECTED': {
      return {
        ...state,
        requestLoading: false,
        requestError: action.payload.message,
      };
    }

    // Loan Terms Select
    case 'ACTIVE_LOAN_TERMS_SELECT_PENDING': {
      return state;
    }

    case 'ACTIVE_LOAN_TERMS_SELECT_FULFILLED': {
      return {
        ...state,
        loan: action.payload,
      };
    }

    case 'ACTIVE_LOAN_TERMS_SELECT_REJECTED': {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    // Loan Pickup Location
    case 'ACTIVE_LOAN_CHOOSE_PICKUP_PENDING': {
      return state;
    }

    case 'ACTIVE_LOAN_CHOOSE_PICKUP_FULFILLED': {
      return {
        ...state,
        loan: action.payload,
      };
    }

    case 'ACTIVE_LOAN_CHOOSE_PICKUP_REJECTED': {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    // Cancel loan
    case 'ACTIVE_LOAN_CANCEL_PENDING': {
      return {
        ...state,
        error: null,
      };
    }

    case 'ACTIVE_LOAN_CANCEL_FULFILLED': {
      return {
        ...state,
        loan: {},
      };
    }

    case 'ACTIVE_LOAN_CANCEL_REJECTED': {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    // Repay loan
    case 'ACTIVE_LOAN_REPAY_PENDING': {
      return {
        ...state,
        error: null,
      };
    }

    case 'ACTIVE_LOAN_REPAY_FULFILLED': {
      return {
        ...state,
        loan: action.payload,
      };
    }

    case 'ACTIVE_LOAN_REPAY_REJECTED': {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    // Close loan
    case 'ACTIVE_LOAN_CLOSE_PENDING': {
      return {
        ...state,
        error: null,
      };
    }

    case 'ACTIVE_LOAN_CLOSE_FULFILLED': {
      return {
        ...state,
        loan: {},
      };
    }

    case 'ACTIVE_LOAN_CLOSE_REJECTED': {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
};
