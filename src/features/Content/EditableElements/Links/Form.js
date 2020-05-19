import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';

import { useSlate } from 'slate-react';
import { setLinks } from '../../editor';



const Form = ({ links, editing, closeForm }) => {
    const editor = useSlate();

    const [ text, setText ] = useState('');
    const [ href, setHref ] = useState('');

    useEffect(() => {
        if (typeof editing === 'number') {
            setText(links[editing].text);
            setHref(links[editing].href);
        } else {
            setText('');
            setHref('');
        }
    }, [editing])

    const submit = e => {
        e.preventDefault();
        let newLinks;

        // if editing an existing link
        if (typeof editing === 'number') {
            newLinks = links.map((link, i) => {
                if (editing !== i) return link;
                return { text, href };
            })
        } else {
            // if creating a new link
            newLinks = [ ...links, { text, href } ];
        }
        
        setLinks(editor, newLinks);
        closeForm();
    }

    return (
        <AnimatePresence>
            {editing !== false && (
                <StyledForm variants={variants}
                    onSubmit={submit}
                    initial='hidden'
                    animate='shown'
                    exit='hidden'>

                    <input 
                        type='text'
                        placeholder='text...'
                        value={text} 
                        onChange={e => setText(e.target.value)} />

                    <input
                        type='text'
                        placeholder='href...' 
                        value={href} 
                        onChange={e => setHref(e.target.value)} />

                    <button>
                        <i className="fas fa-plus"></i>
                    </button>

                    <button className='close' type='reset' onClick={closeForm}>
                        <i className="fas fa-times"></i>
                    </button>

                </StyledForm>
            )}
        </AnimatePresence>
    )
}


const variants = {
    shown: {
        opacity: 1, 
        scale: 1
    },
    hidden: {
        opacity: 0, 
        scale: 0.85
    }
}


const StyledForm = styled(motion.form)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    text-align: center;
    background: rgba(13, 13, 13, 0.8);
    z-index: 200;

    input {
        display: inline-block;
        width: 160px;
        padding: 5px 15px;
        font-size: 1.2rem;
        color: var(--white);
        background: var(--gray5);
        box-shadow: inset 0 0 5px 0 var(--gray6);
        border: 1px solid var(--black);
        border-radius: 3px;
        margin-right: 12px;
    }

    button {
        display: inline-block;
        margin: 0 6px;
        background: var(--black);
        color: var(--gray1);
        border-radius: 3px;
        font-size: 1.2rem;
        padding: 6px 12px;
        transition: .15s;
    }

    button:hover { color: var(--green); }
    button.close:hover { color: var(--red); }
`;

export default Form;