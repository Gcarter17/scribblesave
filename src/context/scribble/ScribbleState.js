import React, { useReducer } from "react";
import axios from "axios";
import ScribbleContext from "./scribbleContext";
import scribbleReducer from "./scribbleReducer";
import {
  GET_SCRIBBLES,
  ADD_SCRIBBLE,
  DELETE_SCRIBBLE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SCRIBBLE,
  FILTER_SCRIBBLES,
  CLEAR_SCRIBBLES,
  CLEAR_FILTER,
  SCRIBBLE_ERROR,
} from "../types";

const ScribbleState = (props) => {
  const initialState = {
    scribbles: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(scribbleReducer, initialState);

  // const url = "http://localhost:5000/scribblesave/us-central1";
  // const url = "https://us-central1-scribblesave.cloudfunctions.net";
  // Get Scribbles
  const getScribbles = async () => {
    try {
      const res = await axios.get(`/api/scribbles`);

      dispatch({
        type: GET_SCRIBBLES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SCRIBBLE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Scribble
  const addScribble = async (scribble) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/scribbles`, scribble, config);

      dispatch({
        type: ADD_SCRIBBLE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SCRIBBLE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Scribble
  const deleteScribble = async (id) => {
    try {
      await axios.delete(`/api/scribbles/${id}`);

      dispatch({
        type: DELETE_SCRIBBLE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: SCRIBBLE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Scribble
  const updateScribble = async (scribble) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // console.log(scribble, 'this is the scribble')
      const res = await axios.put(
        `/api/scribbles/${scribble._id}`,
        scribble,
        config
      );

      dispatch({
        type: UPDATE_SCRIBBLE,
        payload: res.data,
      });
      // --------------- temporary fix to re render components after update
      // const response = await axios.get(`/api/scribbles`);

      // dispatch({
      //   type: GET_SCRIBBLES,
      //   payload: response.data,
      // });
      // --------------- temporary fix to re render components after update
    } catch (err) {
      dispatch({
        type: SCRIBBLE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // // Update Experience
  // const updateExperience = async formData => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   console.log(formData._id, 'this is the scribble id')

  //   try {
  //     const res = await axios.put(
  //       `/api/scribbles/experience/${formData._id}`,
  //       formData,
  //       config
  //     );

  //     dispatch({
  //       type: UPDATE_SCRIBBLE,
  //       payload: res.data
  //     });
  //     // --------------- temporary fix to re render components after update
  //     const response = await axios.get('/api/scribbles');

  //     dispatch({
  //       type: GET_SCRIBBLES,
  //       payload: response.data
  //     });
  //     // --------------- temporary fix to re render components after update

  //   } catch (err) {
  //     dispatch({
  //       type: SCRIBBLE_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  // // Update Scribble Children
  // const updateScribbleChildren = async scribble => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   try {
  //     const res = await axios.put(
  //       `/api/scribbles/children${scribble._id}`,
  //       scribble,
  //       config
  //     );

  //     dispatch({
  //       type: UPDATE_SCRIBBLE,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: SCRIBBLE_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  // Clear Scribbles
  const clearScribbles = () => {
    dispatch({ type: CLEAR_SCRIBBLES });
  };

  // Set Current Scribble
  const setCurrent = (scribble) => {
    dispatch({ type: SET_CURRENT, payload: scribble });
  };

  // Clear Current Scribble
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Scribbles
  const filterScribbles = (text) => {
    dispatch({ type: FILTER_SCRIBBLES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ScribbleContext.Provider
      value={{
        scribbles: state.scribbles,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addScribble,
        deleteScribble,
        setCurrent,
        clearCurrent,
        updateScribble,
        filterScribbles,
        clearFilter,
        getScribbles,
        clearScribbles,
      }}
    >
      {props.children}
    </ScribbleContext.Provider>
  );
};

export default ScribbleState;
