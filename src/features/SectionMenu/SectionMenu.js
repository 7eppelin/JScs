import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { getSections } from '../../dataSlice';

import Scrollbar from 'components/Scrollbar';
import Spinner from 'components/Spinner';
import SectionLink from './SectionLink';


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
                        <SectionLink key={sec.id} 
                            label={sec.name} />
                    ))}

                </motion.ul>
            </Scrollbar>
        </StyledMenu>
    )
}



const StyledMenu = styled.section`
    position: relative;
    background: var(--gray6);
    padding: 5px 0 5px 8px;
    flex-basis: 160px;

    ul {
        margin-right: 11px;
        height: 100%;
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


export default SectionMenu;