import React, { useState } from 'react'
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const CodeEditor = ({ val, setVal, readOnly }) => {

    return (
        <Editor
            value={val}
            readOnly={readOnly}
            onValueChange={setVal}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={readOnly && val === '' ? { backgroundColor: 'transparent' } :
                {
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    backgroundColor: 'white'
                }}
        />
    )
}

export default CodeEditor
