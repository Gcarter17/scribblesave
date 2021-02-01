import React, { useState, useContext, useEffect, Fragment } from "react";
import Scribbles from "../scribbles/Scribbles";
import Mode from "../MainForm/Modal";
import OnOffBtn from "../forms/OnOffBtn";
import AuthContext from "../../context/auth/authContext";
import ScribbleContext from "../../context/scribble/scribbleContext";
import axios from "axios";

import Editor from 'react-simple-code-editor';

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
    token
  } = authContext;

  const scribbleContext = useContext(ScribbleContext);
  const {
    deleteScribble,
    // setCurrent,
    clearCurrent,
    updateScribble,
    scribbles,
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


  useEffect(() => {
    if (token && !user) {
      loadUser(token)
      getScribbles(token);

    }
  })

  return (
    <Fragment>
      <Mode />
      <div className="dashboard-container" >
        <div className="layout-main">
          <div className='folders-main' >
            <Scribbles />
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Dashboard;




// const Dashboard = () => {
//   const authContext = useContext(AuthContext);
//   const {
//     isAuthenticated,
//     logout,
//     user,
//     loadUser,
//     updateUser,
//     setCurrentFolder,
//     currentFolder,
//   } = authContext;
//   // const { email, folders, googleEmail, name, token, _id } = user;
//   const scribbleContext = useContext(ScribbleContext);
//   const {
//     deleteScribble,
//     setCurrent,
//     clearCurrent,
//     updateScribble,
//     scribbles,
//     current,
//   } = scribbleContext;

//   const [folder, setFolder] = useState({
//     title: "",
//   });

//   // console.log(user, "user here");
//   // console.log(user && authContext.user.folders, "folders here");
//   const folders = user && authContext.user.folders;

//   const submit = (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     folders.push(folder);
//     // let id = user && user._id;
//     updateUser(user._id, folders);
//     setFolder({ title: "" });
//   };

//   const remove = (e) => {
//     e.preventDefault();
//     let valid = prompt(`Please retype ${folder.title} to verify its deletion`);
//     if (valid === folder.title) {
//       folders.filter((item) => item.title !== folder.title);
//       updateUser(user._id, folders);
//       setFolder({ title: "" });
//     }
//   };

//   // console.log(current, "current here");

//   // children: Array(1)
//   // 0: {type: "text here", _id: "5f5386c625f99b0c540c1822", content: "the content is here"}
//   // content: "perry the platypus of gavinnoel"
//   // date: "2020-09-05T12:38:29.000Z"
//   // favorite: false
//   // folders: Array(2)
//   // 0: "db folder1"
//   // 1: "db folder2"
//   // link: ""
//   // tags: (2) ["tag 1", "tag2"]
//   // title: "gavin noel folder name"
//   // type: "text"
//   // user: "5f537ea3807451505418ccda"
//   // __v: 0
//   // _id: "5f537feb807451505418ccdd"

//   // console.log(currentFolder, "current folder here!");
//   // {children: Array(0), _id: "5f537fce807451505418ccdb", title: "folder title"} "current folder here!"`

//   return (
//     <div>
//       <Mode />
//       {/* <div className="flexTop">
//         <ul>
//           <li>
//             <SearchBar />
//           </li>
//           <li>
//             <OnOffBtn darkMode={true} />
//           </li>
//         </ul>
//       </div> */}
//       <div className="dashboard-container">
//         <div className="nav-left">
//           <div>
//             <ul>
//               {user &&
//                 user.folders.map((folder, index) => (
//                   <li
//                     onClick={() => {
//                       if (!currentFolder) {
//                         setCurrentFolder(folder);
//                       } else if (currentFolder._id === folder._id) {
//                         setCurrentFolder(null);
//                         setCurrentFolder(folder);
//                       } else {
//                         setCurrentFolder(null);
//                       }
//                     }}
//                     // onClick={() => setCurrentFolder(folder.title)}
//                     key={index}
//                     className={
//                       currentFolder &&
//                       currentFolder._id === folder._id &&
//                       "folder-active"
//                     }
//                     // style={
//                     //   currentFolder &&
//                     //   currentFolder._id === folder._id && { color: "white" }
//                     // }
//                   >
//                     {folder.title}
//                   </li>
//                 ))}
//               {/* <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setCurrentFolder(null);
//                 }}
//               >
//                 Clear current folder!
//               </button> */}
//             </ul>
//             <form onSubmit={submit}>
//               <input
//                 required
//                 value={folder.title}
//                 onChange={(e) => {
//                   setFolder({ ...folder, title: e.target.value });
//                   console.log(folder, "folder here");
//                   // console.log({ ...folders }, "folder obj here");
//                 }}
//               />
//               <button type="submit">add</button>
//               <button onClick={remove}>remove</button>
//             </form>
//           </div>
//         </div>
//         <Scribbles currentFolder={currentFolder} />
//         <div className="dashboard-main">
//           <div className="dashboard-main-folders">
//             <h3>Folders: </h3>
//             {current ? (
//               current.folders.map((item, index) => {
//                 return (
//                   <h3 key={index} style={{ color: "grey" }}>
//                     {item}
//                   </h3>
//                 );
//               })
//             ) : (
//               <h3>&nbsp;</h3>
//             )}
//             {/* <h3>folder name here</h3>
//             <div>&rsaquo;</div>
//             <h3>folder name here</h3> */}
//           </div>
//           <div className="dashboard-main-bar">
//             <h2>
//               {current
//                 ? current.title
//                 : "This is where the title of a scribble would be"}
//             </h2>
//           </div>
//           <div className="dashboard-main-container">
//             <p className="content">
//               {current
//                 ? current.content
//                 : "This is where the content of a scribble would be shown. Get to scribblin!"}
//             </p>
//             <div className="children">
//               {current ? (
//                 current.children.map((item, index) => {
//                   return (
//                     <div key={index} className="child">
//                       <h3>{item.type}</h3>
//                       <p>{item.content}</p>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <>
//                   <div className="child"></div>
//                   <div className="child"></div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;