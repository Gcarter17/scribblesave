import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;
  // end of hooks INIT

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        title: "",
        link: "",
        content: "",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    title: "",
    link: "",
    content: "",
  });

  const { title, link, content } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    // setContact({ ...contact, title });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
      console.log(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Scribble" : "Add Scribble"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Link"
        name="link"
        value={link}
        onChange={onChange}
      />
      <textarea
        type="text"
        placeholder="Content"
        name="content"
        value={content}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? "Update Scribble" : "Add Scribble"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
