import React, { useState, useContext, useEffect, Fragment } from "react";
import Scribbles from "../scribbles/Scribbles";
import Mode from "../MainForm/Modal";
import AuthContext from "../../context/auth/authContext";
import ScribbleContext from "../../context/scribble/scribbleContext";
import StyledFolders from "../styled-components/Folders/StyledFolders";
import Spinner from "../layout/Spinner";
import Navbar from "../../components/layout/Navbar";


const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    user,
    loadUser,
    token
  } = authContext;

  const scribbleContext = useContext(ScribbleContext);
  const {
    scribbles,
    loading,
    getScribbles
    // current,
  } = scribbleContext;

  const [scribbleForm, setScribbleForm] = useState({
    id: '',
    title: '',
    link: '',
    content: '',
    favorite: '',
    children: [],
    tags: [],
    folders: [],
  })

  const { id, title, link, content, favorite, children, tags, folders } = scribbleForm

  useEffect(() => {
    if (token && !user) {
      loadUser(token)
      getScribbles(token);

    }
  })

  return (
    <Fragment>
      <Navbar />
          {scribbles !== null && !loading &&
        <Mode />
      }
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        height: '100%',
      }} >
        {scribbles !== null && !loading ?
          <StyledFolders>
            <Scribbles />
          </StyledFolders>
          :
          <Spinner />

        }
      </div>
    </Fragment>
  );
};

export default Dashboard;