import React, { useState, useContext } from "react";
import Scribbles from "../scribbles/Scribbles";
import SearchBar from "../scribbles/SearchBar";
import Mode from "../layout/Modal";
import OnOffBtn from "../forms/OnOffBtn";
import AuthContext from "../../context/auth/authContext";
import ScribbleContext from "../../context/scribble/scribbleContext";
import axios from "axios";

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
  // const { email, folders, googleEmail, name, token, _id } = user;
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
  });

  // console.log(user, "user here");
  // console.log(user && authContext.user.folders, "folders here");
  const folders = user && authContext.user.folders;

  const submit = (e) => {
    e.preventDefault();
    folders.push(folder);
    let id = user && user._id;
    updateUser(user._id, folders);
    setFolder({ title: "" });
  };

  console.log(current, "current here");

  // children: Array(1)
  // 0: {type: "text here", _id: "5f5386c625f99b0c540c1822", content: "the content is here"}
  // content: "perry the platypus of gavinnoel"
  // date: "2020-09-05T12:38:29.000Z"
  // favorite: false
  // folders: Array(2)
  // 0: "db folder1"
  // 1: "db folder2"
  // link: ""
  // tags: (2) ["tag 1", "tag2"]
  // title: "gavin noel folder name"
  // type: "text"
  // user: "5f537ea3807451505418ccda"
  // __v: 0
  // _id: "5f537feb807451505418ccdd"

  // console.log(currentFolder, "current folder here!");
  // {children: Array(0), _id: "5f537fce807451505418ccdb", title: "folder title"} "current folder here!"`

  return (
    <div>
      <Mode />
      <div className="flexTop">
        <ul>
          <li>
            <SearchBar />
          </li>
          <li>
            <OnOffBtn darkMode={true} />
          </li>
        </ul>
      </div>
      <div className="dashboard-container">
        <div className="nav-left">
          <div>
            <ul>
              {user &&
                user.folders.map((folder, index) => (
                  <li
                    onClick={() => setCurrentFolder(folder)}
                    // onClick={() => setCurrentFolder(folder.title)}
                    key={index}
                    // style={
                    //   currentFolder &&
                    //   currentFolder._id === folder._id && { color: "white" }
                    // }
                  >
                    {folder.title}
                  </li>
                ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentFolder(null);
                }}
              >
                Clear current folder!
              </button>
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
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
        <Scribbles currentFolder={currentFolder} />
        <div className="dashboard-main">
          <div className="dashboard-main-folders">
            <h3>folder name here</h3>
            <div>&rsaquo;</div>
            <h3>folder name here</h3>
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
              {current ? (
                current.children.map((item, index) => {
                  return (
                    <div key={index} className="child">
                      <h3>{item.type}</h3>
                      <p>{item.content}</p>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="child"></div>
                  <div className="child"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
