import React, { useState, useContext } from 'react'
import ScribbleContext from "../../context/scribble/scribbleContext";
import AuthContext from '../../context/auth/authContext'
import StyledFolder from '../styled-components/Folders/StyledFolder';
import StyledScaleSelectors from '../styled-components/Folders/StyledScaleSelectors'

const Folder = (props) => {
    const scribbleContext = useContext(ScribbleContext)
    const authContext = useContext(AuthContext)

    const { currentFolder, setCurrentFolder, user, updateUser } = authContext

    const { _id, title, scale } = props.folder

    // const [folder, setFolder] = useState({
    //     _id: _id,
    //     title: title,
    //     scale: scale ? scale : 'large'
    // });

    const changeScale = (e, scale) => {
        // e.preventDefault();
        // setFolder({ ...folder, scale: scale })
        let contextFolders = user && authContext.user.folders;
        let thisFolder = contextFolders.findIndex(item => item._id === _id)
        contextFolders[thisFolder].scale = scale

        updateUser(user._id, contextFolders)

    };

    let active = currentFolder && props.folder && currentFolder._id === props.folder._id


    return (
        <StyledFolder
            active={active}
            onClick={() => {
                if (!currentFolder) {
                    setCurrentFolder(props.folder);
                }
            }}
            isActive={active}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '1rem',
                position: 'sticky',
                top: '0',
                backgroundColor: 'inherit',
                zIndex: active ? '3' : '1',
                borderBottom: active ? '1px solid white' : 'none'
            }}>
                <h1>{props.title}</h1>
                {active &&
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '4rem', alignItems: 'flex-end' }}>
                        <StyledScaleSelectors small onClick={(e) => { changeScale(e, 'small') }} />
                        <StyledScaleSelectors medium onClick={(e) => { changeScale(e, 'medium') }} />
                        <StyledScaleSelectors large onClick={(e) => { changeScale(e, 'large') }} />
                    </div>
                }
                {active &&
                    <span
                        style={{ position: 'absolute', right: '3rem', color: 'white', cursor: 'pointer', fontSize: '50px', }}
                        onClick={() => {
                            setCurrentFolder(null);
                        }}
                    >&times;</span>
                }
            </div>
            {props.children}
        </StyledFolder>

    )
}

export default Folder
