import React, { useState, useEffect, useContext } from 'react'
import ContactContext from "../../context/contact/contactContext";

const OnOffBtn = ({ isChecked }) => {

    const contactContext = useContext(ContactContext);
    const { current } = contactContext;
    // end of hooks INIT
    useEffect(() => {
        if (current !== null) {
            setChecked(current.checked)
            console.log(current)
        }
    }, [contactContext, current]);

    const [checked, setChecked] = useState(false)

    const onChange = (e) => {
        // console.log(!e.target.checked)
        setChecked(!checked)
        isChecked(!checked)
        // console.log(checked, 'checked')
        // console.log(e.target.checked, "e.target")
    }

    return (
        <>
            {/* <div class="toggle-button-cover" /> */}
            {/* <div class="button-cover"> */}
            <div class="button b2" id="button-16">
                <input checked={checked} onChange={onChange} type="checkbox" class="checkbox" />
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
            {/* </div> */}
        </>
    )
}

export default OnOffBtn
