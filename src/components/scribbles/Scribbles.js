import React, { Fragment, useContext, useEffect } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScribbleItem from "./ScribbleItem";
import Spinner from "../layout/Spinner";
import ScribbleContext from "../../context/scribble/scribbleContext";

const Scribbles = ({ currentFolder }) => {
  const scribbleContext = useContext(ScribbleContext);
  const { scribbles, filtered, getScribbles, loading } = scribbleContext;

  useEffect(() => {
    getScribbles();
    // eslint-disable-next-line
  }, []);

  if (scribbles !== null && scribbles.length === 0 && !loading) {
    return <h4>Please add a Scribble</h4>;
  }

  // let filteredScribbles;
  // if (scribbles !== null && scribbles.length > 0 && !loading) {
  //   let arr = [];
  //   scribbles.forEach((scribble) => {
  //     scribble.folders.forEach((element) => {
  //       arr.push(element);
  //     });
  //   });
  //   // console.log(arr)

  //   filteredScribbles = scribbles.filter(
  //     (item) => !arr.find(({ _id }) => item._id === _id)
  //   );
  // }

  // console.log(filteredScribbles)

  let filteredScribbles;
  if (scribbles !== null && scribbles.length > 0 && !loading && currentFolder) {
    filteredScribbles = scribbles.filter((item) =>
      item.folders.includes(currentFolder.title)
    );
  } else {
    filteredScribbles = scribbles;
  }

  return (
    <Fragment>
      {scribbles !== null && !loading ? (
        <div className="scribbles">
          {filtered !== null ? (
            filtered.map((scribble, index) => (
              <ScribbleItem
                key={scribble._id}
                scribble={scribble}
                index={index}
              />
            ))
          ) : filteredScribbles.length > 0 ? (
            filteredScribbles.map((scribble, index) => (
              // scribbles.map((scribble, index) => (
              <ScribbleItem
                scribble={scribble}
                key={scribble._id}
                index={index}
              />
            ))
          ) : (
            <p style={{ color: "grey" }}>
              Looks like this folder is empty... With the folder selected, press
              the plus icon to start making a new scribble.
            </p>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Scribbles;
