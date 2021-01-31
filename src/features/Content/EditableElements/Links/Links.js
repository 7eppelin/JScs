import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';

import { setLinks } from '../../editor';
import { useEditor, useReadOnly } from 'slate-react';

import List from './List';
import AddButton from './AddButton'
import AnimatedForm from './AnimatedForm'


const Links = ({ element, attributes, children }) => {
    const { links } = element;
    const editor = useEditor();
    const readOnly = useReadOnly();

    // editing === false || link index || true (when creating a new link)
    const [ editing, setEditing ] = useState(false);

    const deleteLink = useCallback(index => {
        const newLinks = links.filter((l, i) => i !== index)
        setLinks(editor, newLinks)
    }, [links, editor])

    return (
        <LinksContainer 
            contentEditable={false}
            {...attributes} >

            <AddButton readOnly={readOnly}
                handleClick={() => setEditing(true)} />

            <List links={links} 
                readOnly={readOnly}
                edit={linkIndex => setEditing(linkIndex)}
                deleteLink={linkIndex => deleteLink(linkIndex)} />

            <AnimatedForm isEditing={editing}
                    links={links}
                    closeForm={() => setEditing(false)} />

            {children}

        </LinksContainer>
    )
}


const LinksContainer = styled.div`
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    user-select: none;
    height: 52px;
    background: var(--black);
    box-shadow: 0 2px 12px -4px black;
`;

export default Links