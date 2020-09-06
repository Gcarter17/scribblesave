import React, { useContext } from "react";
import Modal from "react-modal";
import ScribbleForm from "../forms/ScribbleForm";
import ScribbleContext from "../../context/scribble/scribbleContext";

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
    maxWidth: "400px",
  },
  overlay: {
    // backgroundColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Mode = () => {
  const scribbleContext = useContext(ScribbleContext);
  const { current, clearCurrent } = scribbleContext;
  // end of hooks INIT

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
          <ScribbleForm />
        </div>
      </Modal>
    </>
  );
};

export default Mode;
