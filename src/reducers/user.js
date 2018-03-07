import { firebaseAuth } from '../firebaseHelpers';

const initialState = {
  user: {},
  loading: false,
  signupLoading: false,
  loginLoading: false,
  error: null,
  loggingOut: false,
  updating: false,
};

function deriveUserProps(obj) {
  if (!obj || typeof obj !== 'object') {
    return {};
  }

  const {
    uid,
    email,
    emailVerified,
    phoneNumber,
    dateOfBirth,
    firstName,
    lastName,
    qinBalance,
    created,
    employmentInfo,
    residenceInfo,
  } = obj;

  return {
    uid,
    email,
    emailVerified,
    phoneNumber,
    dateOfBirth,
    firstName,
    lastName,
    qinBalance,
    created,
    employmentInfo,
    residenceInfo,
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'USER_LOAD_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }


    case 'USER_LOAD_FULFILLED': {
      const newUser = deriveUserProps({
        ...firebaseAuth.getCurrentUser(),
        ...action.payload,
      });

      return {
        ...state,
        user: newUser,
        loading: false,
      };
    }

    case 'USER_LOAD_REJECTED': {
      return {
        ...state,
        error: action.payload.message || action.payload,
        loading: false,
      };
    }

    case 'USER_SIGNUP_PENDING': {
      return {
        ...state,
        user: {},
        signupLoading: true,
        signupError: null,
      };
    }

    case 'USER_SIGNUP_FULFILLED': {
      const newUser = deriveUserProps({
        ...firebaseAuth.getCurrentUser(),
        ...action.payload,
      });

      return {
        ...state,
        user: newUser,
        signupLoading: false,
      };
    }

    case 'USER_SIGNUP_REJECTED': {
      return {
        ...state,
        signupError: action.payload.message || action.payload,
        signupLoading: false,
      };
    }

    case 'USER_LOGIN_PENDING': {
      return {
        ...state,
        user: {},
        loading: true,
        loginError: null,
      };
    }

    case 'USER_LOGIN_FULFILLED': {
      const newUser = deriveUserProps({
        ...firebaseAuth.getCurrentUser(),
        ...action.payload,
      });

      return {
        ...state,
        user: newUser,
        loading: false,
      };
    }

    case 'USER_LOGIN_REJECTED': {
      return {
        ...state,
        loginError: action.payload.message || action.payload,
        loading: false,
      };
    }

    case 'USER_LOGOUT_PENDING': {
      return {
        ...state,
        error: null,
        loggingOut: true,
      };
    }

    case 'USER_LOGOUT_FULFILLED': {
      return {
        ...state,
        user: {},
        loggingOut: false,
      };
    }

    case 'USER_LOGOUT_REJECTED': {
      return {
        ...state,
        error: action.payload.message || action.payload,
        loggingOut: false,
      };
    }

    case 'USER_UPDATE_PENDING': {
      return {
        ...state,
        updatingError: null,
        updating: true,
      };
    }

    case 'USER_UPDATE_FULFILLED': {
      const newUser = deriveUserProps({
        ...firebaseAuth.getCurrentUser(),
        ...action.payload,
      });

      return {
        ...state,
        user: newUser,
        updating: false,
      };
    }

    case 'USER_UPDATE_REJECTED': {
      return {
        ...state,
        updatingError: action.payload.message || action.payload,
        updating: false,
      };
    }

    default: {
      return state;
    }
  }
};
