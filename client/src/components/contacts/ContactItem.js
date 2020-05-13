import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact, index }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, title, content, link, favorite, date } = contact;


  // const [theContact, setContact] = useState({
  //   _id: _id,
  //   title: title,
  //   content: content,
  //   link: link,
  //   favorite: favorite,
  //   date: date
  // });

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };


  // const [isFavorite, setFavorite] = useState(false)

  // const newContact = {
  //   _id: _id,
  //   title: title,
  //   content: content,
  //   link: link,
  //   favorite: isFavorite,
  //   date: date
  // }

  // const update = () => {

  //   setFavorite(!contact.favorite)
  //   // const { _id, title, content, link, favorite, date } = contact;

  //   updateContact(newContact)
  // }

  return (
    <div className="card bg-light">
      <div className="card-header">
        {link ? (
          <img src={`https://www.google.com/s2/favicons?domain=${link}`} />
        ) : <span />}
        <div className="card-title">
          <h3 className="text-med text-left">
            {link ? <a target="_blank" href={link}>{title}</a> : <a>{title}</a>}
          </h3>
        </div>
      </div>

      <p className="card-content text-dark text-left">{content}</p>
      <p>{}</p>
      <p>
        <button
          name="editButton"
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
        <span
          // onClick={toforceUpdate}
          className={`${favorite ? "fas gold" : "far grey"} fa-star custom-checkbox`}
        />
        {/* <label
          htmlFor={`id-of-input-${index}`}
          onClick={favorite ? makeFalse : makeTrue}
          className={`${favorite ? "fas gold" : "far grey"} fa-star custom-checkbox`}
        >
          <input type="checkbox" id={`id-of-input-${index}`} />
        </label> */}
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
