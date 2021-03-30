import React, { useState, useContext, useEffect } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from "../../context/auth/authContext";
import RichEditor from "./RichEditor";
import CodeEditor from './CodeEditor'
import StyledInput from "../styled-components/StyledInput";


const ScribbleForm = () => {
  const authContext = useContext(AuthContext);

  const scribbleContext = useContext(ScribbleContext);
  const {
    addScribble,
    deleteScribble,
    updateScribble,
    clearCurrent,
    current,
  } = scribbleContext;

  const [scribble, setScribble] = useState(
    current ? current : {
      id: '',
      title: '',
      link: '',
      content: '',
      codeContent: '',
      richContent: '',
      favorite: false,
      tags: [],
      folders: [],
    }
  );


  const { title, link, content, codeContent, richContent, favorite, tags, folders } = scribble;

  const onChange = (e) => {
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
  };


  return (
    <div className='scribbleForm' >
      {/* <select onChange={(e) => {setScribble({...scribble, folders: [...folders, item.title]})}}>
      {!current && authContext.user &&
          authContext.user.folders.map((item) => {
            return (
              <option>{item.title}</option>
            );
          })}
      </select> */}
      <select>
        <option>testing</option>
        <option>testing 2</option>
      </select>
      {/* ///////////////////////////// */}
      <form onSubmit={onSubmit}>
        {/* FOLDERS HERE, MAKE SURE TO REACTIVATE ========================================================== */}
        {!current && authContext.user &&
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledInput type="text" placeholder="Title" name="title" value={title} onChange={onChange} />
          <StyledInput type="text" placeholder="Link (optional)" name="link" value={link} onChange={onChange} />
          <RichEditor
            placeholder={'Description'}
            setValue={(e, editor) => {
              let innerData = editor.getData()
              setScribble({ ...scribble, richContent: innerData })
            }}
            val={richContent}
          />
          <CodeEditor
            placeholder={'Code'}
            val={codeContent}
            setVal={(e) => {
              setScribble({ ...scribble, codeContent: e })
            }}
          />
        </div>

        <label
          htmlFor={`id-of-input`}
          className={`${favorite ? "fas gold" : "far grey"
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
            onClick={onChange}
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
              value={current ? "Update" : "Add Scribble"}
              className="btn btn-primary"
            />
            <button
              className="btn btn-light"
              onClick={() => { deleteScribble(current && current._id) }}
            >Delete</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ScribbleForm;