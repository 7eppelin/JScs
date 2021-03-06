import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContentItem } from 'dataSlice';

// prismjs theme
import 'assets/css/prism-atom-dark.css';

import { Slate } from 'slate-react';
import { createEditor } from './editor';

import ToggleReadOnly from './ToggleReadOnly'
import Editable from './Editable'
import ContentFooter from 'features/ContentFooter/ContentFooter';


const ContentEditor = ({ content }) => {
    const dispatch = useDispatch()
    const editor = useMemo(() => createEditor(), [])

    const [ editorState, setEditorState ] = useState(content.data);
    const [ readOnly, setReadOnly ] = useState(true);

    const saveChanges = () => {
        dispatch(updateContentItem({
            ...content,
            edited: Date.now(),
            data: editorState
        }))
    }

    return (
        <>
            <ToggleReadOnly readOnly={readOnly}
                toggle={() => {
                    // must nullify the selection when quitting editing
                    // to prevent HoveringMenu from re-appearing at the same place
                    // when the user will start editing again
                    if (!readOnly) editor.selection = null
                    setReadOnly(!readOnly)
                }} />

            <Slate editor={editor} 
                value={editorState} 
                onChange={value => setEditorState(value)}>

                <Editable readOnly={readOnly} />

                <ContentFooter 
                    readOnly={readOnly}
                    edited={content.edited}
                    saveChanges={saveChanges} />
            </Slate>
        </>
    )
}

export default ContentEditor;