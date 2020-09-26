import React, { useState, useContext, useEffect, Fragment } from "react";
import Scribbles from "../scribbles/Scribbles";
import Mode from "../MainForm/Modal";
import OnOffBtn from "../forms/OnOffBtn";
import AuthContext from "../../context/auth/authContext";
import ScribbleContext from "../../context/scribble/scribbleContext";
import axios from "axios";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import RichTextEditor from 'react-rte'

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    logout,
    user,
    loadUser,
    updateUser,
    setCurrentFolder,
    currentFolder,
  } = authContext;

  const scribbleContext = useContext(ScribbleContext);
  const {
    deleteScribble,
    setCurrent,
    clearCurrent,
    updateScribble,
    scribbles,
    current,
  } = scribbleContext;

  const [folder, setFolder] = useState({
    title: "",
    id: ""
  });

  const contextFolders = user && authContext.user.folders;

  // ========================= FOLDER SUBMIT AND REMOVE START
  const submit = (e) => {
    e.preventDefault();
    console.log(e.target);
    contextFolders.push(folder);
    // let id = user && user._id;
    updateUser(user._id, contextFolders);
    setFolder({ title: "" });
  };

  const remove = (e) => {
    e.preventDefault();
    let valid = prompt(`Please retype ${folder.title} to verify its deletion`);
    if (valid === folder.title) {
      contextFolders.filter((item) => item.title !== folder.title);
      updateUser(user._id, contextFolders);
      setFolder({ title: "" });
    }
  };
  // ========================= FOLDER SUBMIT AND REMOVE END

  console.log(current, "current here");

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



  const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(content, 'html'));

  const onValueChange = (e) => {  // code editor onChange
    setScribbleForm({ ...scribbleForm, content: e })
    setEditorValue('<p></p>')
  }

  const handleChange = value => { // react rte onChange
    setEditorValue(value);
    setScribbleForm({ ...scribbleForm, content: value.toString('markdown') })
  };

  //   children: Array(2)
  //      0: {type: "code", _id: "5f6a9844ff66b1228c617a53", content: "here is some code that you can look at"}
  //      1: {type: "text", _id: "5f6a9844ff66b1228c617a54", content: "here is some text"}
  // content: "this is where the content would be"
  // date: "2020-09-23T00:35:16.485Z"
  // favorite: false
  // folders: ["testFolder1"]
  // link: "testerscribble.com"
  // tags: ["testTag1"]
  // title: "tester scribble"
  // user: "5f537ea3807451505418ccda"
  // _id: "5f6a9844ff66b1228c617a52"

  // console.log(currentFolder, "current folder here!");
  // {children: Array(0), _id: "5f537fce807451505418ccdb", title: "folder title"} "current folder here!"`

  const setChildren = () => {
    if (current) {
      if (current.children.length !== 0) {
        current.children.map((item, index) => {
          return (
            <div key={index} className="child">
              <h3>{item.type}</h3>
              <p>{item.content}</p>
            </div>
          );
        })
      } else {
        return (
          <>
            <div className="child">howdy</div>
            <div className="child">
              <RichTextEditor
                value={editorValue}
                onChange={handleChange}
                required
                type="string"
                variant="filled"
                className='rte-form'
              />
            </div>
            <div className="child">
              <Editor
                value={content}
                onValueChange={onValueChange}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  border: '1px solid #ccc',
                  height: '100%'
                }}
              />
            </div>
          </>
        )
      }
    }


  }

  return (
    <Fragment>

      <Mode />
      {/* <div className="flexTop">
        <ul>
          <li>
            <SearchBar />
          </li>
          <li>
            <OnOffBtn darkMode={true} />
          </li>
        </ul>
      </div> */}
      <div className="dashboard-container" >
        <div className="nav-left">
          <div>
            <ul>
              {user &&
                user.folders.map((folder, index) => (
                  <li
                    onClick={() => {
                      console.log(currentFolder, 'current folder')
                      if (!currentFolder) {
                        // console.log(folder, 'folder here')
                        setCurrentFolder(folder);
                      } else if (currentFolder._id === folder._id) {
                        setCurrentFolder(null);
                      }
                    }}
                    // onClick={() => setCurrentFolder(folder.title)}
                    key={index}
                    className={
                      currentFolder &&
                      currentFolder._id === folder._id &&
                      "folder-active"
                    }
                  // style={
                  //   currentFolder &&
                  //   currentFolder._id === folder._id && { color: "white" }
                  // }
                  >
                    {folder.title}
                  </li>
                ))}
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentFolder(null);
                }}
              >
                Clear current folder!
              </button> */}
            </ul>
            <form onSubmit={submit}>
              <input
                required
                value={folder.title}
                onChange={(e) => {
                  setFolder({ ...folder, title: e.target.value });
                  console.log(folder, "folder here");
                  // console.log({ ...folders }, "folder obj here");
                }}
              />
              <button type="submit">add</button>
              <button onClick={remove}>remove</button>
            </form>
          </div>
        </div>
        <Scribbles currentFolder={currentFolder} />
        <div className="dashboard-main">
          <div className="dashboard-main-folders">
            <h3>Folders: </h3>
            {current ? (
              current.folders.map((item, index) => {
                return (
                  <h3 key={index} style={{ color: "grey" }}>
                    {item}
                  </h3>
                );
              })
            ) : (
                <h3>&nbsp;</h3>
              )}
            {/* <h3>folder name here</h3>
            <div>&rsaquo;</div>
            <h3>folder name here</h3> */}
          </div>
          <div className="dashboard-main-bar">
            <h2>
              {current
                ? current.title
                : "This is where the title of a scribble would be"}
            </h2>
          </div>
          <div className="dashboard-main-container">
            <p className="content">
              {current
                ? current.content
                : "This is where the content of a scribble would be shown. Get to scribblin!"}
            </p>
            <div className="children">
              {setChildren()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Dashboard;
