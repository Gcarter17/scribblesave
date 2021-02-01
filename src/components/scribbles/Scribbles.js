import React, { Fragment, useContext, useEffect } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScribbleItem from "./ScribbleItem";
import Spinner from "../layout/Spinner";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from '../../context/auth/authContext'
import Folder from './Folder'
import Fade from 'react-reveal/Fade';


const Scribbles = () => {
  const scribbleContext = useContext(ScribbleContext);
  const authContext = useContext(AuthContext)
  const { scribbles, filtered, getScribbles, loading } = scribbleContext;
  const { user, currentFolder } = authContext

  if (scribbles !== null && scribbles.length === 0 && !loading) {
    return <h4>Please add a Scribble</h4>;
  }

  // console.log(scribbles && scribbles[0].folders, 'scribbles here')
  // console.log(scribbles && scribbles.filter(scrib => scrib.folders.length === 0), 'more scribbles here')

  console.log(user && user.folders)

  return (
    <Fragment>
      {scribbles !== null && !loading ?
        <Fragment>
          {
            user && user.folders.map((item) => {
              return (
                <Folder folder={item} title={item.title} >
                  <div className='scribble-grid' >
                    {scribbles.filter(scrib => scrib.folders.includes(item.title)).map((scrib, index) => { // scribbles who belong to said folder
                      return (
                        <ScribbleItem index={index} currentFolder={currentFolder} scribble={scrib} />
                      )
                    })}
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                    <div className="scrrible-item faux-scribble-item" ></div>
                  </div>
                </Folder>
              )
            })
          }
          <Folder title={'Unassigned'} folder={'Unassigned'} >
            <div className='scribble-grid' >
              {scribbles.filter(scrib => scrib.folders.length === 0).map((scrib, index) => { // scribbles who belong to said folder
                return (
                  <ScribbleItem index={index} scribble={scrib} />
                )
              })}
            </div>
          </Folder>

          {/* <ul className='extra-folder' >
            {scribbles.filter(scrib => scrib.folders.length === 0).map((scrib) => { // scribbles who belong to said folder
              return (
                <ScribbleItem scribble={scrib} />
              )
            })}
          </ul> */}

        </Fragment>

        : <Spinner />}
    </Fragment>
  );
};

export default Scribbles;
