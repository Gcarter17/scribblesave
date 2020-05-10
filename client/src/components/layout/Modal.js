import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import ContactForm from "../contacts/ContactForm";
import ContactContext from "../../context/contact/contactContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Mode = () => {
  const contactContext = useContext(ContactContext);
  const { current } = contactContext;
  // end of hooks INIT

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const modalOpen = () => {
    // component level model opening
    setIsOpen(true);
  };

  let arr = document.getElementsByClassName("btn-dark");
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", function () {
      modalOpen();
    });
  }

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <span
        // onClick={() => appContext.setModal(!appContext.openModal)}
        onClick={modalOpen}
        className="fa-stack fixed-activate"
      >
        <i className=" fa fa-circle plus-red  fa-stack-2x"></i>
        <i className=" fa fa-plus fa-stack-1x font-med fa-inverse"></i>
      </span>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <span className="close-btn" onClick={closeModal}>
          <i className="times-red fas fa-times"></i>
        </span>
        <div className="form-container">
          <ContactForm />
        </div>
      </Modal>
    </div>
  );
};

export default Mode;
