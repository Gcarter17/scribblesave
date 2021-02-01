import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
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
  SET_FOLDER,
  // GOOGLE_LOGIN_SUCCESS,
  // GOOGLE_LOGIN_FAIL,
  GOOGLE_REGISTER_SUCCESS,
  GOOGLE_REGISTER_FAIL,
  url
} from "../types";


const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    currentFolder: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // const url = "http://localhost:5000/scribblesave/us-central1";
  // const url = 'https://us-central1-scribblesave.cloudfunctions.net'

  const updateUser = async (id, folders) => {
    console.log("something happened");
    console.log(folders, "folders inside state");
    try {
      const res = await axios.put(
        `${url}/api/users/${id}`,
        { folders },
        { headers: { "Content-Type": "application/json" } }
      );
      // const res = await axios.put(
      //   `/api/users/${id}`,
      //   { folders },
      //   { headers: { "Content-Type": "application/json" } }
      // );

      dispatch({
        type: USER_UPDATED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`${url}/api/auth`);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData, "formdata");
    try {
      // const res = await axios.post(`/api/users`, formData, config);
      const res = await axios.post(`${url}/api/users`, formData, config);
      console.log(res, "response here");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // loadUser();
    } catch (err) {
      console.log(err, "error registering");
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const googleRegister = async () => {
    try {
      const res = await axios.get(`${url}/auth/google`);

      dispatch({
        type: GOOGLE_REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: GOOGLE_REGISTER_FAIL,
        payload: err,
        // payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`${url}/api/auth`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  const setCurrentFolder = (folder) => {
    dispatch({ type: SET_FOLDER, payload: folder });
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        currentFolder: state.currentFolder,
        loading: state.loading,
        user: state.user,
        error: state.error,
        setCurrentFolder,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
        googleRegister,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
