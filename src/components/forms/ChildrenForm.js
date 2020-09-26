import React, { useState, useContext } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";

const FoldersForm = ({ scribble }) => {
  const scribbleContext = useContext(ScribbleContext);
  const {
    updateScribble,
    // ,clearCurrent
    current,
    scribbles,
    loading,
  } = scribbleContext;

  const [formData, setFormData] = useState({
    description: "",
  });
  const { description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    setFormData({ ...formData, description: e._id });
    // console.log(e._id)
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();
    // console.log(formData, 'formdata')
    formData._id = current._id;
    updateScribble(formData);
    console.log(formData, "formdata for add here");
    // object with only description and id

    setFormData({ description: "" });
  };

  const [removeFormData, setRemoveFormData] = useState({
    description: "",
  });

  const onRemoveChange = (e) => {
    setRemoveFormData({ ...removeFormData, [e.target.name]: e.target.value });
  };

  const onRemoveClick = (e) => {
    setRemoveFormData({ ...removeFormData, description: e._id });
  };

  const onSubmitRemove = (e) => {
    e.preventDefault();
    let scrib = scribble;
    let thing = scribble.folders.filter(
      // previously was a capital F on folders
      // let thing = scribble.folders.filter(
      (item) => item._id !== removeFormData.description
    );
    scrib.Folders = thing;

    updateScribble(scrib);
    // setRemoveFormData({ description: '' })
    // checked: false
    // content: "Different snippets of code to take from↵"
    // date: "2020-08-30T10:21:01.000Z"
    // Folders: []
    // favorite: false
    // link: ""
    // title: "Code Folder"
    // user: "5e7171a2214b7f49906a782e"
    // __v: 7
    // _id: "5ecf0b4f933f297018a30803"
    console.log(scrib, "scrib here");
    console.log(thing, "thing here");
  };

  // console.log(formData)

  let filteredScribbles; // opposite of below
  let adjustedScribbles; // has the id of the current scribble taken out
  let nestedScribbles;
  if (scribbles !== null && scribbles.length > 0 && !loading) {
    let arr = [];
    scribbles.forEach((scribble) => {
      scribble.Folders.forEach((element) => {
        arr.push(element);
      });
    });

    filteredScribbles = scribbles.filter(
      (item) => !arr.find(({ _id }) => item._id === _id)
    );
    if (current) {
      adjustedScribbles = filteredScribbles.filter((item) => {
        return !item._id.includes(current._id);
      });
      nestedScribbles = scribbles.filter((item) =>
        current.Folders.find(({ _id }) => item._id === _id)
      );
    }
  }

  return (
    <>
      <form onSubmit={onSubmitAdd}>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
          readOnly
        />
        <input
          type="submit"
          value={"Add"}
          className="btn btn-primary btn-modal"
        />
        <div className="grid-2 mb-15">
          {adjustedScribbles &&
            adjustedScribbles.map((scribble, index) => (
              <div className="folders-form-headers">
                {scribble.link ? (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${scribble.link}`}
                  />
                ) : (
                  <span />
                )}
                <div style={{ background: "inherit" }} className="card-title">
                  <h3
                    onClick={() => onClick(scribble)}
                    className="text-med text-left"
                  >
                    <a>{scribble.title}</a>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </form>
      <form onSubmit={onSubmitRemove}>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={removeFormData.description}
          onChange={onRemoveChange}
          readOnly
        />
        <input
          type="submit"
          value={"Remove"}
          className="btn btn-primary btn-modal"
        />
        <div className="grid-3">
          {nestedScribbles &&
            nestedScribbles.map((scribble, index) => (
              <div className="card-header">
                {scribble.link ? (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${scribble.link}`}
                  />
                ) : (
                  <span />
                )}
                <div style={{ background: "inherit" }} className="card-title">
                  <h3
                    onClick={() => onRemoveClick(scribble)}
                    className="text-med text-left"
                  >
                    <a>{scribble.title}</a>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default FoldersForm;
