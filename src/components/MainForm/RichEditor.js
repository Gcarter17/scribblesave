import React, { useState } from 'react'

import RichTextEditor from "react-rte";


const RichEditor = () => {

    const [scribble, setScribble] = useState('')

    const [rteValue, setRteValue] = useState(
        RichTextEditor.createValueFromString(scribble, "html")
    );

    const rteOnChange = (value) => {
        // react rte onChange ===================================================
        setRteValue(value);
        setScribble(value.toString("markdown"));
    };

    console.log(scribble)       // THIS IS THE VALUE TO BE SENT TO THE FORM

    return (
        <RichTextEditor
            value={rteValue}
            onChange={rteOnChange}
            required
            type="string"
            variant="filled"
        // style={{ minHeight: 410 }}
        />
    )
}

export default RichEditor
