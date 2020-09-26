import React, { useContext, useRef, useEffect } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";
import DragNDrop from "../layout/DragNDrop";
import Card from "../layout/Card";

const ScribbleFilter = () => {
  const scribbleContext = useContext(ScribbleContext);
  const text = useRef("");

  const { filterScribbles, clearFilter, filtered } = scribbleContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterScribbles(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <input
        className="searchbar"
        ref={text}
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
      {/* <div className="flexbox">

        <DragNDrop id={`board`} className='board'>

        </DragNDrop>


      </div> */}
    </>
  );
};

export default ScribbleFilter;
