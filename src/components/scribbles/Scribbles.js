import React, { Fragment, useContext, useEffect } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScribbleItem from "./ScribbleItem";
import Spinner from "../layout/Spinner";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from '../../context/auth/authContext'
import Folder from './Folder'
import Fade from 'react-reveal/Fade';
import StyledScribbleGrid from "../styled-components/Folders/StyledScribbleGrid";
import ScribbleAdd from "./ScribbleAdd";

const Scribbles = () => {
  const scribbleContext = useContext(ScribbleContext);
  const authContext = useContext(AuthContext)
  const { scribbles, filtered, getScribbles, loading } = scribbleContext;
  const { user, currentFolder } = authContext

  if (scribbles !== null && scribbles.length === 0 && !loading) {
    return <h4>Please add a Scribble</h4>;
  }

  const fauxScribbles = () => {
    return (
      <Fragment>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1000 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1001 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1002 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1003 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1004 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1005 }} ></div>
        <div className="scrrible-item faux-scribble-item" style={{ order: 1006 }} ></div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {
        user && user.folders.map((item) => {
          return (
            <Folder key={item._id} folder={item} title={item.title} >
              <StyledScribbleGrid scale={item.scale}>
                {scribbles.filter(scrib => scrib.folders.includes(item.title)).map((scrib, index) => { // scribbles who belong to said folder
                  return (
                    <ScribbleItem key={scrib._id} index={index} currentFolder={currentFolder} scribble={scrib} scale={item.scale} />
                  )
                })}
                {fauxScribbles()}
                {/* <ScribbleAdd scale={item.scale} /> */}
              </StyledScribbleGrid>
            </Folder>
          )
        })
      }
      <Folder title={'Unassigned'} folder={'Unassigned'} >
        <StyledScribbleGrid>
          {scribbles.filter(scrib => scrib.folders.length === 0).map((scrib, index) => { // scribbles who belong to said folder
            return (
              <ScribbleItem key={scrib._id} index={index} scribble={scrib} />
            )
          })}
        </StyledScribbleGrid>
      </Folder>
    </Fragment>
  );
};

export default Scribbles;
