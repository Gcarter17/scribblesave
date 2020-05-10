import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ChildrenForm = (contact_id) => {
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;
    // end of hooks INIT


    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                title: ''
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        title: ''
    });

    const { title } = contact;

    const onChange = e =>
        // setContact({ ...contact, title });
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
            console.log(contact)
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
            <h2 className='text-primary'>
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChange}
            />
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
          </button>
                </div>
            )}
        </form>
    );
};

export default ChildrenForm;
