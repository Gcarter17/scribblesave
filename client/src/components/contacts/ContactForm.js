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
        favorite: false
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    title: "",
    link: "",
    content: "",
    favorite: false
  });

  const { title, link, content, favorite } = contact;

  const onChange = (e) => {
    if (e.target.type !== "checkbox") {
      setContact({ ...contact, [e.target.name]: e.target.value });

    } else {
      setContact({ ...contact, [e.target.name]: e.target.checked })

    }
    // setContact({ ...contact, title });
    // setTimeout(function () { console.log(contact) }, 1000);

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
  // console.log(favorite)
  // const handleChange = (e) => {
  //   let checked = e.target.checked
  //   setContact({ ...contact, favorite: !checked })
  // }
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
      <label
        htmlFor={`id-of-input`}
        className={`${favorite ? "fas gold" : "far grey"} fa-star custom-checkbox`}
      >
        <input
          hidden
          id={`id-of-input`}
          type="checkbox"
          name="favorite"
          onClick={onChange}
          checked={favorite}
        />
        <input
          hidden
          type="checkbox"
          name="favorite"
          // onClick={onChange}
          checked={!favorite}
        />
      </label>


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
