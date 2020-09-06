import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ScribbleContext from "../../context/scribble/scribbleContext";
import moment from "moment";
import MyEditor from "../forms/RichEditor";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import trimText from "../forms/trimText";
import RichTextEditor from "react-rte";

const ScribbleItem = ({ scribble, index }) => {
  const scribbleContext = useContext(ScribbleContext);
  const {
    deleteScribble,
    setCurrent,
    clearCurrent,
    updateScribble,
    scribbles,
    current,
  } = scribbleContext;

  const {
    _id,
    title,
    link,
    content,
    favorite,
    type,
    folders,
    tags,
    date,
  } = scribble;

  // console.log(scribble, "scribble here");

  // content: "heres the content↵"
  // date: "2020-09-02T07:58:53.880Z"
  // favorite: false
  // folders: []
  // link: ""
  // tags: []
  // title: "first scribble"
  // type: "text"
  // user: "5f4e54559a5ac31e8077c04b"
  // __v: 0
  // _id: "5f4f50bd7d476c387437193a"

  return (
    <div
      className={
        current && current._id === _id
          ? "scribble-item scribble-item-selected"
          : "scribble-item"
      }
      onClick={() => setCurrent(scribble)}
    >
      {/* <img src={`https://www.google.com/s2/favicons?domain=${link}`} /> */}
      <img src={`https://www.google.com/s2/favicons?domain=facebook.com`} />
      <h6>{title} 60 CHARACTER MAX, more text would be found here</h6>
      <p>{content}which you will only find right here for all time</p>
    </div>
  );
};

ScribbleItem.propTypes = {
  scribble: PropTypes.object.isRequired,
};

export default ScribbleItem;

// const onDelete = () => {
//   let arr = [];
//   scribbles.forEach((scribble) => {
//     scribble.folders.forEach((element) => {
//       arr.push(element._id);
//     });
//   });
//   // console.log(arr)
//   if (arr.includes(_id)) {
//     alert("first remove card from folder to delete...");
//   } else {
//     deleteScribble(_id);
//   }
//   console.log(arr.includes(_id), "array includes id");
//   // clearCurrent();
// };

// const setTheCurrent = () => {
//   // console.log(scribble)
//   setCurrent(scribble);
// };

// const dropDown = () => {
//   // buttons drop login (edit and delete)
//   setIsDropped(!isDropped);
//   if (!isDropped) {
//     setTimeout(function () {
//       setIsDropped(false);
//     }, 5000);
//   }
// };
// const [isDropped, setIsDropped] = useState(false);

// const setDrop = () => {
//   // chevron drop logic
//   setChevronDrop(!chevronDrop);
// };
// const [chevronDrop, setChevronDrop] = useState(false);

// const readMoreLess = () => {
//   // console.log(editorValue.toString('markdown'))
//   // console.log(textArray[0])
//   if (!editorValue.open) {
//     setEditorValue({
//       content: RichTextEditor.createValueFromString(
//         textArray[0].concat(textArray[1]),
//         "markdown"
//       ),
//       open: true,
//     });
//   } else {
//     setEditorValue({
//       content: RichTextEditor.createValueFromString(textArray[0], "markdown"),
//       open: false,
//     });
//   }
// };

// let textArray = trimText(content, 1, 150, 99999); // min, ideal, max characters
// // let codeArray = trimText(content, 1, 100, 99999);  // min, ideal, max characters
// const [editorValue, setEditorValue] = useState({
//   // content: RichTextEditor.createValueFromString(trimText(content, 1, 160, 99999)[0], 'markdown'),
//   content: RichTextEditor.createValueFromString(textArray[0], "markdown"),
//   open: false,
// });

// let scribblesArr;
// if (folders.length > 0) {
//   scribblesArr = scribbles.filter((item) =>
//     folders.find(({ _id }) => item._id === _id)
//   );
// }

// <>
//       <div
//         className={
//           editorValue.open ? "card bg-light grid-grow-2" : "card bg-light"
//         }
//       >
//         <div className="card-header">
//           {link ? (
//             <img src={`https://www.google.com/s2/favicons?domain=${link}`} />
//           ) : (
//             <span />
//           )}
//           <div className="card-title">
//             <h3 className="text-med text-left">
//               {link ? (
//                 <a
//                   rel="noopener noreferrer"
//                   target="_blank"
//                   href={link.includes("http") ? link : `//${link}`}
//                 >
//                   {title}
//                 </a>
//               ) : (
//                 <a>{title}</a>
//               )}
//             </h3>
//           </div>
//         </div>

//         {/* <p className="card-content text-dark text-left">{content}</p> */}
//         {/* <CodeEditor content={content} /> */}
//         {/* {checked.toString()} */}
//         {checked ? (
//           editorValue.open ? (
//             <Editor
//               // value={trimText(content, 1, 100, 99999)[0].concat(trimText(content, 1, 100, 99999)[1])}
//               value={textArray[0].concat(textArray[1])}
//               readOnly={true}
//               highlight={(code) => highlight(code, languages.js)}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//               }}
//             />
//           ) : (
//             <Editor
//               // value={trimText(content, 1, 100, 99999)[0]}
//               value={textArray[0]}
//               readOnly={true}
//               highlight={(code) => highlight(code, languages.js)}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//               }}
//             />
//           )
//         ) : (
//           <RichTextEditor
//             value={editorValue.content}
//             required
//             type="string"
//             variant="filled"
//             readOnly={true}
//             style={{ minHeight: 410 }}
//             className="rte-item py-1"
//           />
//         )}
//         {/* <p className={readContent ? 'display-true' : 'display-none'}>{textArray[1]}</p> */}
//         {/* <RichTextEditor
//           value={editorValue}
//           required
//           type="string"
//           variant="filled"
//           readOnly={true}
//           style={{ minHeight: 410 }}
//           className='rte-item py-1'
//         /> */}
//         <p className="card-btm">
//           <span
//             className={`${
//               favorite ? "fas gold" : "far grey"
//             } fa-star custom-checkbox`}
//           />
//           <div className="theDate">
//             {textArray[1] && (
//               <span onClick={readMoreLess} className="readMore">
//                 {editorValue.open ? "read less..." : "read more..."}
//               </span>
//             )}

//             <span>{moment(theDate).calendar()}</span>

//             {folders.length > 0 ? (
//               <div
//                 onClick={setDrop}
//                 className={chevronDrop ? "toggle" : "toggle active"}
//               >
//                 <div class="left"></div>
//                 <div class="right"></div>
//               </div>
//             ) : null}
//           </div>
//           <div className="dropdown">
//             {/* <button onMouseEnter={() => dropDown(true)} onMouseLeave={() => dropDown(false)} className="dropbtn">Dropdown</button> */}
//             <button onClick={dropDown} className="dropbtn">
//               ...
//             </button>
//             <div
//               className={
//                 isDropped ? "dropdown-content show" : "dropdown-content"
//               }
//             >
//               {/* <div className={"dropdown-content show"}> */}
//               <button
//                 name="editButton"
//                 className="btn btn-dark btn-sm"
//                 onClick={setTheCurrent}
//               >
//                 Edit
//               </button>
//               <button className="btn btn-danger btn-sm" onClick={onDelete}>
//                 Delete
//               </button>
//               {/* any singular item placed here will be made into a dropdown component */}
//             </div>
//           </div>
//         </p>
//       </div>
//       {scribblesArr &&
//         chevronDrop &&
//         scribblesArr.map((scribble, index) => (
//           <ScribbleItem
//             scribble={scribble}
//             key={scribble.title}
//             index={index}
//           />
//         ))}
//     </>
