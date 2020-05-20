import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";
import moment from 'moment';
import MyEditor from "../layout/RichEditor"
import CodeEditor from "../layout/CodeEditor"


const ContactItem = ({ contact, index }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent, updateContact } = contactContext;

  const { _id, title, link, content, favorite, date } = contact;

  const theDate = date

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const setTheCurrent = () => {
    clearCurrent()
    setCurrent(contact)
  }

  const dropDown = () => {
    setIsDropped(!isDropped)
    if (!isDropped) {
      setTimeout(function () { setIsDropped(false) }, 5000);
    }
  }
  const [isDropped, setIsDropped] = useState(false);

  // inbetween / and / is the symbol to be replaced, and " " is what to replace it with
  // let newContent = content.replace(/{/g, "<h1>");
  // let newestContent = newContent.replace(/}/g, "</h1>");

  return (

    // <Card id={`card-${index}`} className="card" draggable='true'>


    <div className="card bg-light">
      <div className="card-header">
        {link ? (
          <img src={`https://www.google.com/s2/favicons?domain=${link}`} />
        ) : <span />}
        <div className="card-title">
          <h3 className="text-med text-left">
            {link ? <a rel="noopener noreferrer" target="_blank" href={link}>{title}</a> : <a>{title}</a>}
          </h3>
        </div>
      </div>

      {/* <p className="card-content text-dark text-left">{content}</p> */}
      <CodeEditor content={content} />
      {/* <MyEditor styles={"rte-item py-1"} content={content} id={_id} updateContact={updateContact} readOnly={true} /> */}

      <p className="card-btm">
        <span
          className={`${favorite ? "fas gold" : "far grey"} fa-star custom-checkbox`}
        />
        <span className="theDate">{moment(theDate).calendar()}</span>
        <div className="dropdown">
          {/* <button onMouseEnter={() => dropDown(true)} onMouseLeave={() => dropDown(false)} className="dropbtn">Dropdown</button> */}
          <button onClick={dropDown} className="dropbtn">...</button>
          <div className={isDropped ? "dropdown-content show" : "dropdown-content"}>
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
    </div >
    // </Card>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;


{/* <DragNDrop id={`board-${index}`} className='board'>
<Card id={`card-${index}`} className="card" draggable='true'> */}


// {/* <div className="flexbox">
//   <DragNDrop id='board-1' className='board'>
{/* <Card id="card-1" className="card" draggable='true'>
  <p>card one</p>
</Card> */}
//   </DragNDrop>
//   <DragNDrop id='board-2' className='board'>
//     <Card id="card-2" className="card" draggable='true'>
//       <p>card two</p>
//     </Card>
//   </DragNDrop>
// </div> */}