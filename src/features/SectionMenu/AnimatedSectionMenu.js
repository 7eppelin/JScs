import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import Spinner from 'components/Spinner';


const AnimatedSectionMenu = ({ 
    children,
    scrollbarRef,
    showSpinner
}) => (
    <Section>
        {showSpinner ?
            <Spinner /> 
            : 
            <motion.div className='scrollbar'
                ref={scrollbarRef}
                variants={list} 

                initial='hidden' 
                animate='visible'>

                <ul>{children}</ul>
            </motion.div>
        }
    </Section>
)



const Section = styled.section`
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


export default AnimatedSectionMenu