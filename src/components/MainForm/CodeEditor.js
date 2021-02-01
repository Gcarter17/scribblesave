import React, { useState } from 'react'
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";


const CodeEditor = ({ val, setVal, readOnly }) => {
    // const [scribble, setScribble] = useState('')

    // const onValueChange = (e) => {

    // };

    // console.log(scribble)

    return (
        <Editor
            value={val}
            readOnly={readOnly}
            onValueChange={setVal}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                // border: "1px solid #ccc",
                // backgroundColor: '#2C303A'
                backgroundColor: 'white'
            }}
        />
    )
}

export default CodeEditor
