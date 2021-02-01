import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichEditor = ({ val, setValue }) => {


    return (
        <CKEditor
            editor={ClassicEditor}
            data={val ? val : ''}
            onChange={setValue}
        />
    )
}

export default RichEditor