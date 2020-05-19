import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";
import ContactContext from "../../context/contact/contactContext";
import DragNDrop from "../layout/DragNDrop"

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Scribble</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {/* <DragNDrop id='board-20' className='board'> */}
          <div className="grid-3">
            {filtered !== null
              ? filtered.map((contact, index) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} index={index} />
                </CSSTransition>
              ))
              : contacts.map((contact, index) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} key={contact.title} index={index} />
                </CSSTransition>
              ))}

          </div>
          {/* </DragNDrop> */}
        </TransitionGroup>
      ) : (
          <Spinner />
        )}

    </Fragment>
  );
};

export default Contacts;
