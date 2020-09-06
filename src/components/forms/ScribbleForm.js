import React, { useState, useContext, useEffect } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from "../../context/auth/authContext";
import MyEditor from "./RichEditor";
import ChildrenForm from "./ChildrenForm";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import RichTextEditor from "react-rte";

const ScribbleForm = () => {
  const authContext = useContext(AuthContext);

  const scribbleContext = useContext(ScribbleContext);
  const {
    addScribble,
    updateScribble,
    clearCurrent,
    current,
  } = scribbleContext;
  // end of hooks INIT
  useEffect(() => {
    if (current !== null) {
      setScribble(current);
      // setEditorValue(current.content)
      setEditorValue(
        RichTextEditor.createValueFromString(current.content, "markdown")
      );
      // setEditorValue(RichTextEditor.createValueFromString(content, 'markdown'))
    } else {
      setScribble({
        title: "",
        link: "",
        content: "",
        folders: [],
        checked: false,
        favorite: false,
      });
    }
  }, [scribbleContext, current]);

  const [scribble, setScribble] = useState({
    title: "",
    link: "",
    content: "",
    folders: [],
    checked: false,
    favorite: false,
  });

  const { title, link, content, checked, favorite, folders } = scribble;

  const onChange = (e) => {
    // normal input onChange
    if (e.target.type !== "checkbox") {
      setScribble({ ...scribble, [e.target.name]: e.target.value }); // takes the contact object (value as is) and adds target value to target name
    } else if (e.target.type) {
      setScribble({ ...scribble, [e.target.name]: e.target.checked });
    }
  };

  const onValueChange = (e) => {
    // code editor onChange
    setScribble({ ...scribble, content: e });
  };

  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(content, "html")
  );

  const handleChange = (value) => {
    // react rte onChange
    setEditorValue(value);
    setScribble({ ...scribble, content: value.toString("markdown") });
  };

  const checkedChange = (e) => {
    setScribble({ ...scribble, checked: e.target.checked });
    // console.log(!checked)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(contact)
    if (current === null) {
      addScribble(scribble);
    } else {
      updateScribble(scribble);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
    setEditorValue(RichTextEditor.createEmptyValue());
  };

  // console.log(current, "current here");

  // let arr = []
  // const pushIt = () => {
  //   matches.props.children.forEach((element, index) => {
  //     // arr.push({
  //     //   title: element.props.children,
  //     //   link: element.props.HREF,
  //     //   content: index,
  //     //   favorite: false
  //     // })
  //     addContact({
  //       title: element.props.children,
  //       link: element.props.HREF,
  //       content: index,
  //       favorite: false
  //     })
  //   })
  // }

  // console.log(authContext.user && authContext.user, "user here");

  // const [folderState, setFolderState] = useState([]);
  // console.log(folderState);
  console.log(folders, "folders here");
  console.log(scribble, "scribble here");

  return (
    <>
      {/* <span onClick={pushIt}>hello</span> */}
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">
          {current ? "Edit Scribble" : "Add Scribble"}
        </h2>
        {authContext.user &&
          authContext.user.folders.map((item) => {
            return (
              <>
                <input
                  type="checkbox"
                  name={item.title}
                  value={item.title}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // setFolderState(() => [...folderState, item.title]);
                      setScribble({
                        ...scribble,
                        folders: [...folders, item.title],
                      });
                    } else {
                      // setFolderState(() =>
                      //   folderState.filter((i) => i !== item.title)
                      // );
                      setScribble({
                        ...scribble,
                        folders: folders.filter((i) => i !== item.title),
                      });
                    }
                  }}
                />
                <label htmlFor={item.title}>{item.title}</label>
              </>
            );
          })}
        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> */}
        {/* <label htmlFor="vehicle1"> I have a bike</label> */}
        {/* <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" /> */}
        {/* <label htmlFor="vehicle2"> I have a car</label> */}
        {/* <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" /> */}
        {/* <label htmlFor="vehicle3"> I have a boat</label> */}
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Link"
          name="link"
          value={link}
          onChange={onChange}
        />

        {/* <OnOffBtn isChecked={check} /> */}
        {/* <div class="onOffButton">
          <input
            checked={checked}
            onChange={checkedChange}
            type="checkbox"
            class="checkbox"
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div> */}

        <textarea
          type="text"
          placeholder="Content"
          name="content"
          value={content}
          onChange={onChange}
        />
        {/* <RichTextEditor
          value={editorValue}
          onChange={handleChange}
          required
          type="string"
          variant="filled"
          // style={{ minHeight: 410 }}
          className={checked && "contact-rte"}
        />
        <Editor
          value={content}
          onValueChange={onValueChange}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #ccc",
          }}
          className={!checked && "contact-rte"}
        /> */}
        <label
          htmlFor={`id-of-input`}
          className={`${
            favorite ? "fas gold" : "far grey"
          } fa-star custom-checkbox`}
        >
          <input
            hidden
            id={`id-of-input`}
            type="checkbox"
            name="favorite"
            onClick={onChange}
            checked={favorite}
          />
          <input
            hidden
            type="checkbox"
            name="favorite"
            // onClick={onChange}
            checked={!favorite}
          />
        </label>
        {!current && (
          <input
            style={{ display: "block", margin: "0 auto" }}
            type="submit"
            value={"Add Scribble"}
            className="btn btn-primary"
          />
        )}

        {current && (
          <div className="children-inline">
            <input
              type="submit"
              value={current ? "Update Scribble" : "Add Scribble"}
              className="btn btn-primary"
            />
            <button className="btn btn-light" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
      {/* {current && <ChildrenForm scribble={scribble} />} */}
    </>
  );
};

export default ScribbleForm;
