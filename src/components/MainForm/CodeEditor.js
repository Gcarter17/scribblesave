import React, { useState } from 'react'
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";


const CodeEditor = () => {
    const [scribble, setScribble] = useState('')

    const onValueChange = (e) => {
        setScribble(e);
    };

    console.log(scribble)

    return (
        <Editor
            value={scribble}
            onValueChange={onValueChange}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ccc",
            }}
        />
    )
}

export default CodeEditor
