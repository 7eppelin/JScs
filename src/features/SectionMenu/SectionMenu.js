import React, { useRef, useCallback } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { updateSectionsOrderInDB } from 'utils';

import Spinner from 'components/Spinner';
import SectionLink from './SectionLink';


const SectionMenu = ({ 
    isAdmin, 
    prevSection,
    sections, 
    reorderSections 
}) => {
    const scrollbar = useRef();
    const ul = useRef();

    // invoked onDragEnd
    const updateDB = useCallback(() => {
        const ids = sections.map(sec => sec.id)
        if (isAdmin) updateSectionsOrderInDB(ids)
    }, [isAdmin, sections])

    // if this is the first render of the app
    // (otherwise sections would've been fetched before)
    // the About section is being rendered
    // (otherwise prevSection would've had a string value)
    if (!sections && !prevSection) return (
        <StyledMenu>
            <Spinner size={75} />
        </StyledMenu>
    )

    return (
        <StyledMenu>
            <motion.div className='scrollbar'
                ref={scrollbar}
                variants={list} 
                inherit={false}
                initial='hidden' 
                animate='visible'>

                <ul ref={ul} >

                    {sections.map((sec, i) => (
                        <SectionLink key={sec.id} 
                            label={sec.name}
                            i={i}
                            scrollbar={scrollbar}
                            ul={ul}
                            updateDB={updateDB}
                            moveItem={reorderSections}
                        />
                    ))}

                </ul>
            </motion.div>
        </StyledMenu>
    )
}



const StyledMenu = styled.section`
    position: relative;
    background: var(--gray6);
    width: 15vw;
    padding: 5px 2px 5px 8px;

    .scrollbar {
        background: var(--black);
        transition: background 2s;
    }

    ul {
        max-height: 100%;
        padding-right: 2px;
    }
`;


// framer-motion's variants
const list = {
    hidden: { 
        scale: 0.3,
        opacity: 0,
    },
    visible: { 
        opacity: 1,
        scale: 1,
        transition: { 
            when: 'beforeChildren',
            staggerChildren: 0.08,
        },
        transitionEnd: { background: 'var(--gray6)'}
    }
}


export default SectionMenu;