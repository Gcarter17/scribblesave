import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";
import moment from "moment";
import MyEditor from "../forms/RichEditor";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const ContactItem = ({ contact, index }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    contacts,
  } = contactContext;

  // useEffect(() => {
  //   setContactState({
  //     _id: contact._id,
  //     title: contact.title,
  //     link: contact.link,
  //     content: contact.content,
  //     checked: contact.checked,
  //     favorite: contact.favorite,
  //     date: contact.date
  //   })
  // })

  // const [contactState, setContactState] = useState({
  //   _id: '',
  //   title: '',
  //   link: '',
  //   content: '',
  //   checked: '',
  //   favorite: '',
  //   date: ''
  // })

  // const { _id, title, link, content, checked, favorite, date } = contactState;
  const {
    _id,
    title,
    link,
    content,
    checked,
    experience,
    favorite,
    date,
  } = contact;

  const theDate = date;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const setTheCurrent = () => {
    setCurrent(contact);
  };

  const dropDown = () => {
    // buttons drop login (edit and delete)
    setIsDropped(!isDropped);
    if (!isDropped) {
      setTimeout(function () {
        setIsDropped(false);
      }, 5000);
    }
  };
  const [isDropped, setIsDropped] = useState(false);

  const setDrop = () => {
    // chevron drop logic
    setChevronDrop(!chevronDrop);
  };
  const [chevronDrop, setChevronDrop] = useState(false);

  let contactsArr;
  if (experience.length > 0) {
    contactsArr = contacts.filter((item) =>
      experience.find(({ _id }) => item._id === _id)
    );
  }
  // console.log(contactsArr)

  return (
    <>
      <div className="card bg-light">
        {/* <p>{contactsArr}</p> */}
        <div className="card-header">
          {link ? (
            <img src={`https://www.google.com/s2/favicons?domain=${link}`} />
          ) : (
            <span />
          )}
          <div className="card-title">
            <h3 className="text-med text-left">
              {link ? (
                <a rel="noopener noreferrer" target="_blank" href={link}>
                  {title}
                </a>
              ) : (
                <a>{title}</a>
              )}
            </h3>
          </div>
        </div>

        {/* <p className="card-content text-dark text-left">{content}</p> */}
        {/* <CodeEditor content={content} /> */}
        {/* {checked.toString()} */}
        {checked ? (
          <Editor
            value={content}
            // onValueChange={null}
            readOnly={true}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        ) : (
          <MyEditor
            styles={"rte-item py-1"}
            content={content}
            id={_id}
            updateContact={updateContact}
            readOnly={true}
          />
        )}
        <p className="card-btm">
          <span
            className={`${
              favorite ? "fas gold" : "far grey"
            } fa-star custom-checkbox`}
          />
          <span className="theDate">
            {moment(theDate).calendar()}
            {experience.length > 0 ? (
              <div
                onClick={setDrop}
                className={chevronDrop ? "toggle" : "toggle active"}
              >
                <div class="left"></div>
                <div class="right"></div>
              </div>
            ) : null}
          </span>

          <div className="dropdown">
            {/* <button onMouseEnter={() => dropDown(true)} onMouseLeave={() => dropDown(false)} className="dropbtn">Dropdown</button> */}
            <button onClick={dropDown} className="dropbtn">
              ...
            </button>
            <div
              className={
                isDropped ? "dropdown-content show" : "dropdown-content"
              }
            >
              {/* <div className={"dropdown-content show"}> */}
              <button
                name="editButton"
                className="btn btn-dark btn-sm"
                // onClick={() => setCurrent(contact)}
                onClick={setTheCurrent}
              >
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={onDelete}>
                Delete
              </button>
              {/* any singular item placed here will be made into a dropdown component */}
            </div>
          </div>
        </p>
        {contactsArr &&
          chevronDrop &&
          contactsArr.map((contact, index) => (
            <ContactItem contact={contact} key={contact.title} index={index} />
          ))}
      </div>
      {contactsArr &&
        chevronDrop &&
        contactsArr.map((contact, index) => (
          <ContactItem contact={contact} key={contact.title} index={index} />
        ))}
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
