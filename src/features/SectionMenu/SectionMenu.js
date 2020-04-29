import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { getSections } from '../../dataSlice';

import Scrollbar from 'components/Scrollbar';
import Spinner from 'components/Spinner';
import SectionLink from './SectionLink';

const StyledMenu = styled.section`
    position: relative;
    background: var(--gray6);
    padding: 5px;
    padding-left: 8px;
    padding-right: 0;
    flex-basis: 160px;

    ul {
        background: var(--gray5);
        margin-right: 10px;
        height: 100%;
    }

    li {
        display: block;
        border-bottom: 3px solid var(--gray6);
    }
`;


// framer-motion's variants
const list = {
    hidden: { scale: 0 },
    visible: { 
        scale: 1,
        transition: { 
            duration: 0.3,
            when: 'beforeChildren',
            staggerChildren: 0.08,
        }
    }
}

const item = {
    hidden: { 
        opacity: 0,
        scaleY: 0.6,
        y: -10
    },
    visible: { 
        opacity: 1,
        scaleY: 1,
        y: 0
    },
}


const SectionMenu = () => {
    const dispatch = useDispatch();
    const sectionsObj = useSelector(state => state.data.sections.byID);
    const sections = Object.values(sectionsObj);

    useEffect(() => {
        dispatch(getSections());
    }, [])

    if (!sections.length) return <StyledMenu><Spinner /></StyledMenu>

    return (
        <StyledMenu>
            <Scrollbar>
                <motion.ul variants={list} 
                        initial='hidden' 
                        animate='visible' >
                    {sections.map(sec => (
                        <motion.li key={sec.id} variants={item} >
                            <SectionLink label={sec.name} />
                        </motion.li>
                    ))}
                </motion.ul>
            </Scrollbar>
        </StyledMenu>
    )
}

export default SectionMenu;