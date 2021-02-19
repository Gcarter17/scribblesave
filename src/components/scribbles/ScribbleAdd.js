import React, { useContext, useState, useEffect, Fragment } from "react";
import ScribbleContext from "../../context/scribble/scribbleContext";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import StlyedScribbeAdd from "../styled-components/Scribbles/StlyedScribbeAdd";

const ScribbleAdd = ({ folder, currentFolder, scale }) => {
    const scribbleContext = useContext(ScribbleContext);

    const { deleteScribble, setCurrent, clearCurrent, updateScribble, scribbles, current, } = scribbleContext;

    let active = folder && currentFolder && folder._id === currentFolder._id

    if (active) {
        return (
            <div className={scale === 'small' ? 'scribble-item-container small' : scale === 'medium' ? 'scribble-item-container medium' : 'scribble-item-container'} >
                <StlyedScribbeAdd scale={scale}>
                    <div>
                        <NoteAddIcon />
                    </div>
                </StlyedScribbeAdd>
            </div>
        )
    } else {
        return (
            <Fragment></Fragment>
        )
    }




};


export default ScribbleAdd
