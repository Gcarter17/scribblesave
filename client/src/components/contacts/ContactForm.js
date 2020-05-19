import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import MyEditor from "../layout/RichEditor"
import ExperienceForm from "./ExperienceForm"
import RichTextEditor from 'react-rte';

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
      setContact({ ...contact, [e.target.name]: e.target.value }); // takes the contact object (value as is) and adds target value to target name

    } else if (e.target.type) {
      setContact({ ...contact, [e.target.name]: e.target.checked })

    } else {
      console.log(e)

    }

  };

  const onContentChange = (e) => {
    setContact({ ...contact, content: e })
    // setContact({ ...contact, content: e.toString("markdown") })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  // let val = document.querySelectorAll('[data-text]');
  // console.log(RichTextEditor.createValueFromString({ content }, "html"))
  return (
    <>
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

        {/* <textarea
          type="text"
          placeholder="Content"
          name="content"
          value={content}
          onChange={onChange}
        />
        <MyEditor styles={"rte-form"} onChange={onContentChange} content={content} /> */}
        {/* <MyEditor styles={"rte-form"} onChange={onContentChange} content={content} /> */}
        {current ? <textarea
          type="text"
          placeholder="Content"
          name="content"
          value={content}
          onChange={onChange}
        /> : <MyEditor styles={"rte-form"} onChange={onContentChange} content={content} />}

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
      <ExperienceForm />
    </>
  );
};

export default ContactForm;
