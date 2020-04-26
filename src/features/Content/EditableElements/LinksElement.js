import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import Links from './Links';
import LinkForm from './LinkForm';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const LinksContainer = styled(motion.div)`
    position: relative;
    user-select: none;
    height: 45px;
    background: var(--gray6);
    box-shadow: 0 3px 12px -3px var(--black);

    ul {
        padding-right: 40px;
    }

    & > button {
        position: absolute;
        top: 6px;
        right: 12px;
        border: 1px solid var(--gray5);
        background: var(--black);
        color: var(--gray1);
        border-radius: 3px;
        font-size: 1.4rem;
        padding: 7px;
        transition: .15s;
    }

    & > button:hover {
        color: var(--green);
    }
`;

const LinksElement = ({ element, attributes, children }) => {
    const { links } = element;
    const [ editing, setEditing ] = useState(false); // boolean || link index

    console.log(links);

    return (
        <LinksContainer 
            variants={elem} 
            contentEditable={false}
            {...attributes} >

            <Links links={links} 
                edit={linkIndex => setEditing(linkIndex)} />
                

            <button onClick={() => setEditing(true)} >
                <i className="fas fa-plus"></i>
            </button>

            <LinkForm editing={editing}
                links={links}
                closeForm={() => setEditing(false)} />

            {children}

        </LinksContainer>
    )
}

export default LinksElement;