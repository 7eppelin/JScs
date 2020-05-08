import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';
import { getSections, setSectionsOrder } from '../../dataSlice';
import { updateSectionsOrderInDB } from 'utils/db';

import Spinner from 'components/Spinner';
import SectionLink from './SectionLink';


const SectionMenu = () => {
    const dispatch = useDispatch();

    // object of sections { id: {section}, ... }
    const sections = useSelector(state => state.data.sections.byID);

    // array of sections' ids that is responsible 
    // for order in which items will appear in the menu
    const ids = useSelector(state => state.data.sections.ids);

    const isAdmin = useSelector(state => state.user && state.user.isAdmin)

    const container = useRef();

    useEffect(() => {
        dispatch(getSections());
    }, [])

    if (!ids.length) return <StyledMenu><Spinner /></StyledMenu>


    // this function will be invoked
    // every time the dragged elem was moved 
    // by more than 32px up or down
    const moveItem = (current, target) => {
        // the args are the current and the target indexes
        // of the dragged elem in the ids array
        if (target < 0) return;
        const newOrder = [...ids];

        // delete the elem from the ids array
        const el = newOrder.splice(current, 1)[0];
        // and insert it in the target position
        newOrder.splice(target, 0, el);

        dispatch(setSectionsOrder(newOrder)) 
    }


    // invoked onDragEnd
    const updateDB = () => {
        if (isAdmin) updateSectionsOrderInDB(ids)
    }


    return (
        <StyledMenu>
            <motion.ul ref={container}
                className='scrollbar'
                variants={list} 
                initial='hidden' 
                animate='visible' >

                {ids.map((id, i) => (
                    <SectionLink key={id} 
                        label={sections[id].name}
                        i={i}
                        container={container}
                        updateDB={updateDB}
                        moveItem={moveItem}
                    />
                ))}

            </motion.ul>
        </StyledMenu>
    )
}



const StyledMenu = styled.section`
    position: relative;
    background: var(--gray6);
    flex-basis: 160px;
    padding: 5px 0 5px 8px;

    ul {
        background: var(--black);
        margin-right: 11px;
        height: 100%;
        transition: background 2s;
        overflow-y: auto;
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