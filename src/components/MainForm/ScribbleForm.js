import React, { useState, useContext, useEffect } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from "../../context/auth/authContext";
import MyEditor from "../forms/RichEditor";
import ChildrenForm from "../forms/ChildrenForm";
import RichEditor from "./RichEditor";
import CodeEditor from './CodeEditor'

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
      // setRteValue(
      //   RichTextEditor.createValueFromString(current.content, "markdown")
      // );
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
    id: '',
    title: '',
    link: '',
    content: '',
    favorite: '',
    children: [],
    tags: [],
    folders: [],
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
    // setRteValue(RichTextEditor.createEmptyValue());
  };



  return (
    <>
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
                      setScribble({
                        ...scribble,
                        folders: [...folders, item.title],
                      });
                    } else {
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
        <RichEditor />
        <CodeEditor />
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
