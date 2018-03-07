const initialState = {
  loans: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOANS_LOAD_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    // TODO: get rid of demoloans
    case 'LOANS_LOAD_FULFILLED': {
      return Object.assign({}, state, {
        loading: false,
        loans: action.payload.loans || [],
      });
    }

    case 'LOANS_LOAD_REJECTED': {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.message || action.payload,
      });
    }

    default: {
      return state;
    }
  }
};
