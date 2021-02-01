import React, { useContext, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import ScribbleContext from "../../context/scribble/scribbleContext";
import moment from "moment";
import trimText from "../forms/trimText";
import ScribbleForm from '../MainForm/ScribbleForm'
import CodeEditor from '../MainForm/CodeEditor'

const ScribbleItem = ({ index, scribble, currentFolder }) => {
  const scribbleContext = useContext(ScribbleContext);

  const { deleteScribble, setCurrent, clearCurrent, updateScribble, scribbles, current, } = scribbleContext;

  const { _id, title, link, codeContent, richContent, favorite, type, folders, tags, date, } = scribble;

  const innerHtml = () => { return { __html: richContent } }

  const [active, setActive] = useState(false)


  // const trimmedText = trimText(richContent, 1, 150, 99999)
  // console.log(index)
  return (
    <div
      className={
        current && current._id === _id
          ? "scribble-item scribble-item-selected"
          : active ? 'scribble-item scribble-item-active' :
            "scribble-item"
      }
      onMouseOver={() => {
        if (currentFolder) {
          setActive(true)
        }
      }}
      onMouseOut={() => {
        setActive(false)
      }}
      onClick={() => {
        if (currentFolder) {
          if (!current) {
            setCurrent(scribble)
          }
        }
      }}
    >
      {/* <img src={`https://www.google.com/s2/favicons?domain=${link}`} /> */}
      {/* <img src={`https://www.google.com/s2/favicons?domain=facebook.com`} /> */}

      {current && current._id === _id ?
        <Fragment>
          <h1
            className='scribble-x'
            onClick={() => {
              setCurrent(null)
            }}
          >&times;</h1>
          <ScribbleForm />
        </Fragment>
        :
        <Fragment>
          <h6>{title}</h6>
          <div
            className='scribble-content'
            dangerouslySetInnerHTML={innerHtml()}
          />
          <CodeEditor val={codeContent} readOnly={true} />
        </Fragment>
      }
    </div>
  );
};

ScribbleItem.propTypes = {
  scribble: PropTypes.object.isRequired,
};

export default ScribbleItem;
