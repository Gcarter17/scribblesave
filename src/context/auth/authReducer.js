import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_UPDATED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GOOGLE_REGISTER_FAIL,
  GOOGLE_REGISTER_SUCCESS,
  SET_FOLDER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    case USER_LOADED:
    case USER_UPDATED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case GOOGLE_REGISTER_SUCCESS:
    case LOGIN_SUCCESS: // logged in ----------------------------------------------
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case GOOGLE_REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT: // logged out -----------------------------------------------
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        currentFolder: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
