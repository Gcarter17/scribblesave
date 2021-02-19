import React, { Fragment, useContext } from 'react';
import spinner from './spinner.gif';
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from "../../context/auth/authContext";



const Spinner = () => {
  const authContext = useContext(AuthContext);
  const scribbleContext = useContext(ScribbleContext);
  const { current, clearCurrent, clearScribbles } = scribbleContext;
  const { isAuthenticated, logout, user, loadUser, updateUser } = authContext;

  const onLogout = () => {
    logout();
    clearScribbles();
  };

  return (

    <Fragment>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 'auto'
      }}>

        <img
          src={spinner}
          style={{ width: '200px' }}
          alt='Loading...'
        />
        <h1 style={{ cursor: 'pointer', display: 'block', margin: 'auto' }} onClick={onLogout}>LOGOUT</h1>
      </div>

    </Fragment>
  )

}

export default Spinner
