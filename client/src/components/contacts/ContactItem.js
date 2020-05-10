import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact, index }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, title, content, link, date } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <div className="card-title">
        {link ? (
          <img src={`https://www.google.com/s2/favicons?domain=${link}`} />
        ) : null}
        <h3 className="text-primary text-left">
          <a href={link}>{title}</a>
        </h3>
      </div>
      <h3 className="text-dark text-left">{content}</h3>
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
        {/* <label htmlFor={`id-of-input-${index}`} className="custom-checkbox">
          <input type="checkbox" id={`id-of-input-${index}`} />
          <i className="fa fa-star star glyphicon glyphicon-star-empty"></i>
          <i className="fa fa-star star glyphicon glyphicon-star"></i>
          <i class="fa fa-star star"></i>
        </label> */}
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
