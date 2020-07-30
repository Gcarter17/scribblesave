import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  // GOOGLE_LOGIN_SUCCESS,
  // GOOGLE_LOGIN_FAIL,
  GOOGLE_REGISTER_SUCCESS,
  GOOGLE_REGISTER_FAIL
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('https://us-central1-scribblesave.cloudfunctions.net/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(formData, 'formdata')
    try {
      const res = await axios.post('https://us-central1-scribblesave.cloudfunctions.net/api/users', formData, config);
      // const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      console.log(err, 'error here big man')
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Google Register
  // const googleRegister = async (name, formData, token) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/users/google', formData, config);

  //     dispatch({
  //       type: GOOGLE_REGISTER_SUCCESS,
  //       payload: res.data
  //     });

  //     loadUser();
  //   } catch (err) {
  //     dispatch({
  //       type: GOOGLE_REGISTER_FAIL,
  //       payload: err.response.data.msg
  //     });
  //   }
  // };


  const googleRegister = async () => {

    try {
      const res = await axios.get('https://us-central1-scribblesave.cloudfunctions.net/auth/google');

      dispatch({
        type: GOOGLE_REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: GOOGLE_REGISTER_FAIL,
        payload: err
        // payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('https://us-central1-scribblesave.cloudfunctions.net/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
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
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        googleRegister
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
