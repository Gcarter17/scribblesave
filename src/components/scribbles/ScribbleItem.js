import React, { useContext, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import ScribbleContext from "../../context/scribble/scribbleContext";
import moment from "moment";
import trimText from "../forms/trimText";
import ScribbleForm from '../MainForm/ScribbleForm'
import CodeEditor from '../MainForm/CodeEditor'
import StyledScribbleItem from '../styled-components/Scribbles/StyledScribbleItem'

const ScribbleItem = ({ index, scribble, currentFolder, scale }) => {
  const scribbleContext = useContext(ScribbleContext);

  const { deleteScribble, setCurrent, clearCurrent, updateScribble, scribbles, current, } = scribbleContext;
  const { _id, title, link, codeContent, richContent, favorite, type, folders, tags, date, } = scribble;
  const innerHtml = () => { return { __html: richContent } }

  return (

    <div className={scale === 'small' ? 'scribble-item-container small' : scale === 'medium' ? 'scribble-item-container medium' : 'scribble-item-container'} >
      <StyledScribbleItem
        scale={scale}
        index={index}
        id={_id}
        current={current && current._id}
        currentFolder={currentFolder}
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
            {/* <h6>{trimText(title, 1, 10, 10)}</h6> */}
            <div
              className='scribble-content'
              dangerouslySetInnerHTML={innerHtml()}
            />
            <CodeEditor val={codeContent} readOnly={true} />
          </Fragment>
        }
        {/* </div> */}
      </StyledScribbleItem>
    </div>


  );
};

ScribbleItem.propTypes = {
  scribble: PropTypes.object.isRequired,
};

export default ScribbleItem;
