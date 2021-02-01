import React, { useContext, useState } from "react";
import Modal from "react-modal";
import ScribbleForm from "./ScribbleForm";
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from "../../context/auth/authContext";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // overflow: "scroll",
    // maxHeight: "100vh",
    // transform: "translate(-50%, -50%)",
    // width: "calc(100% - 40px)",
    // maxWidth: "700px",
    top: "auto",
    left: "auto",
    right: "0",
    bottom: "0",
    overflow: "scroll",
    maxHeight: "100vh",
    // transform: "translate(-50%, -50%)",
    maxWidth: "600px",
  },
  overlay: {
    // backgroundColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Mode = () => {
  const authContext = useContext(AuthContext);
  const scribbleContext = useContext(ScribbleContext);
  const { current, clearCurrent, clearScribbles } = scribbleContext;
  const { isAuthenticated, logout, user, loadUser, updateUser } = authContext;



  // ========================= FOLDER SUBMIT AND REMOVE START

  const [folder, setFolder] = useState({
    title: "",
    id: ""
  });

  const contextFolders = user && authContext.user.folders;

  const submit = (e) => {
    e.preventDefault();
    console.log(e.target);
    contextFolders.push(folder);
    updateUser(user._id, contextFolders);
    setFolder({ title: "" });
  };
  const remove = (e) => {
    e.preventDefault();
    updateUser(user._id, contextFolders.filter(item => item.title !== folder.title))
  };
  // ========================= FOLDER SUBMIT AND REMOVE END



  const onLogout = () => {
    logout();
    clearScribbles();
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const modalOpen = () => {
    // component level model opening
    setIsOpen(true);
  };

  // if (current) {
  //   setTimeout(() => {
  //     modalOpen();
  //   }, 0);
  // }

  const closeModal = () => {
    setIsOpen(false);
    // clearCurrent();
  };
  return (
    <>
      <span onClick={modalOpen} className="fa-stack fixed-activate">
        <i className=" fa fa-circle plus-red  fa-stack-2x"></i>
        <i className=" fa fa-plus fa-stack-1x plus-med fa-inverse"></i>
      </span>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="close-btn" onClick={closeModal}>
          <i className="times-red fas fa-times"></i>
        </span>
        <div className="form-container">
          <br />
          <br />
          <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
          <br />
          <br />
          <form onSubmit={submit}>
            <input
              required
              value={folder.title}
              onChange={(e) => {
                setFolder({ ...folder, title: e.target.value });
              }}
            />
            <button type="submit">add</button>
            <button onClick={remove}>remove</button>
          </form>
          <br />
          <br />

          <ScribbleForm />
        </div>
      </Modal>
    </>
  );
};

export default Mode;
