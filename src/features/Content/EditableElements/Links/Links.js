import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { setLinks } from '../../editor';
import { useEditor, useReadOnly } from 'slate-react';

import List from './List';
import Form from './Form';



const Links = ({ element, attributes, children }) => {
    const { links } = element;
    const [ editing, setEditing ] = useState(false); // boolean || link index
    const editor = useEditor();
    const readOnly = useReadOnly();

    const deleteLink = useCallback(index => {
        setLinks(editor,
            links.filter((l, i) => i !== index))
    }, [links])

    return (
        <LinksContainer 
            variants={elem} 
            contentEditable={false}
            {...attributes} >

            <AddButton variants={addButtonVariants}
                animate={readOnly ? 'hidden' : 'shown'}
                onClick={() => setEditing(true)} >
                    <i className="fas fa-plus"></i>
            </AddButton>

            <List links={links} 
                readOnly={readOnly}
                edit={linkIndex => setEditing(linkIndex)}
                deleteLink={linkIndex => deleteLink(linkIndex)} />
            

            <Form editing={editing}
                links={links}
                closeForm={() => setEditing(false)} />

            {children}

        </LinksContainer>
    )
}


const LinksContainer = styled(motion.div)`
    position: relative;
    user-select: none;
    height: 50px;
    background: var(--black);
    margin-bottom: 25px;
    box-shadow: 0 2px 12px -4px black;
`;

const AddButton = styled(motion.button)`
    position: absolute;
    top: 6px;
    left: 11px;
    z-index: 10;
    border: 1px solid var(--gray5);
    box-shadow: 0 0 5px -1px black;
    background: var(--black2);
    color: var(--gray1);
    border-radius: 3px;
    font-size: 1.4rem;
    padding: 10px 11px;
    transition: .15s;

    &:hover { color: var(--green) }
`;


const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}

const addButtonVariants = {
    shown: {
        display: '',
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 150,
            damping: 8,
        },
    },
    hidden: {
        opacity: 0,
        x: -80,
        scale: 0.7,
        transitionEnd: {
            display: 'none'
        }
    }
}

export default Links