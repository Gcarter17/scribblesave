import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ExperienceForm = () => {
    const contactContext = useContext(ContactContext);
    const { updateContact
        // ,clearCurrent
        , current, contacts } = contactContext;
    // end of hooks INIT

    // useEffect(() => {
    //     if (current !== null) {
    //         setFormData(current);
    //     } else {
    //         setFormData({
    //             title: "",
    //             link: "",
    //             content: "",
    //             favorite: false
    //         });
    //     }
    // }, [contactContext, current]);

    // console.log(current._id)


    const [formData, setFormData] = useState({
        description: ''
    })

    const { description } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    // console.log(formData)

    const onSubmit = (e) => {
        e.preventDefault()
        formData._id = current._id
        updateContact(formData)
        setFormData({ description: '' })
    };


    // console.log(current)

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={onChange}
            />
            <input
                type="submit"
                value={"Add"}
                className="btn btn-primary btn-block"
            />
            {contacts.map((contact, index) =>
                // <p>{contact.title}</p>
                <div className="card-header">
                    {contact.link ? (
                        <img src={`https://www.google.com/s2/favicons?domain=${contact.link}`} />
                    ) : <span />}
                    <div className="card-title">
                        <h3 className="text-med text-left">
                            {contact.link ? <a rel="noopener noreferrer" target="_blank" href={contact.link}>{contact.title}</a> : <a>{contact.title}</a>}
                        </h3>
                    </div>
                </div>
            )}
        </form>
    );
};

export default ExperienceForm;
