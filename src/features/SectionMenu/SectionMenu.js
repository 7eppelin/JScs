import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';
import { getSections, moveSection } from '../../dataSlice';

import Scrollbar from 'components/Scrollbar';
import Spinner from 'components/Spinner';
import SectionLink from './SectionLink';


const SectionMenu = () => {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.data.sections.byID);
    const ids = useSelector(state => state.data.sections.ids);

    useEffect(() => {
        dispatch(getSections());
    }, [])

    if (!ids.length) return <StyledMenu><Spinner /></StyledMenu>

    return (
        <StyledMenu>
            <Scrollbar>
                <motion.ul variants={list} 
                    initial='hidden' 
                    animate='visible' >

                    {ids.map((id, i) => (
                        <SectionLink key={id} 
                            i={i}
                            moveItem={(current, target) => {
                                dispatch(moveSection({ current, target })
                            )}}
                            label={sections[id].name} />
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
        background: var(--black);
        margin-right: 11px;
        height: 100%;
        transition: background 2s;
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
        },
        transitionEnd: { background: 'var(--gray6)'}
    }
}


export default SectionMenu;