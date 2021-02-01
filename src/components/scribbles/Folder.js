import React, { useContext, useEffect, Fragment } from 'react'
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from '../../context/auth/authContext'

const Folder = (props) => {
    const scribbleContext = useContext(ScribbleContext)
    const authContext = useContext(AuthContext)

    const {
        deleteScribble,
        setCurrent,
        clearCurrent,
        updateScribble,
        scribbles,
        getScribbles,
        current
    } = scribbleContext;

    const {
        currentFolder,
        setCurrentFolder,
    } = authContext

    // useEffect(() => {
    //     console.log(currentFolder, 'current here')
    // })


    return (

        <div className={currentFolder === props.folder ? 'folder-active fade-right' : 'folder'}

            onClick={() => {
                if (!currentFolder) {
                    setCurrentFolder(props.folder);
                }
            }}
        >
            <h1 style={{ color: 'white' }}>{props.title}</h1>

            {currentFolder === props.folder &&
                <h1
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '3rem',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '50px',

                    }}
                    onClick={() => {
                        setCurrentFolder(null);
                    }}
                >	&times;</h1>
            }
            {props.children}
        </div>
    )
}

export default Folder
