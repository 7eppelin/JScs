import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { Editor } from './../editor';
import { useSlate, useReadOnly } from 'slate-react';

import Links from './Links';
import LinkForm from './LinkForm';


const LinksContainer = styled(motion.div)`
    position: relative;
    user-select: none;
    height: 45px;
    background: var(--gray6);
    margin-bottom: 20px;
    box-shadow: 0 3px 12px -3px var(--black);

    ul {
        padding-right: 40px;
    }
`;

const AddButton = styled(motion.button)`
    position: absolute;
    top: 6px;
    right: 12px;
    border: 1px solid var(--gray5);
    background: var(--black);
    color: var(--gray1);
    border-radius: 3px;
    font-size: 1.4rem;
    padding: 7px 9px;
    transition: .15s;

    &:hover {
        color: var(--green);
    }
`;


const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}

const addButtonVariants = {
    shown: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 150,
            damping: 8,
        }
    },
    hidden: {
        opacity: 0,
        x: 80,
        scale: 0.7,
    }
}


const LinksElement = ({ element, attributes, children }) => {
    const { links } = element;
    const [ editing, setEditing ] = useState(false); // boolean || link index
    const editor = useSlate();
    const readOnly = useReadOnly();

    const deleteLink = useCallback(index => {
        Editor.setLinks(editor,
            links.filter((l, i) => i !== index))
    }, [links])

    return (
        <LinksContainer 
            variants={elem} 
            contentEditable={false}
            {...attributes} >

            <Links links={links} 
                readOnly={readOnly}
                edit={linkIndex => setEditing(linkIndex)}
                deleteLink={linkIndex => deleteLink(linkIndex)} />
                

            <AddButton variants={addButtonVariants}
                animate={readOnly ? 'hidden' : 'shown'}
                onClick={() => setEditing(true)} >
                    <i className="fas fa-plus"></i>
            </AddButton>

            <LinkForm editing={editing}
                links={links}
                closeForm={() => setEditing(false)} />

            {children}

        </LinksContainer>
    )
}

export default LinksElement;