import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichEditor = ({ val, setValue, placeholder }) => {


    return (
        <CKEditor
            editor={ClassicEditor}
            data={val ? val : ''}
            onChange={setValue}
            config={{ placeholder: placeholder }}
        />
    )
}

export default RichEditor