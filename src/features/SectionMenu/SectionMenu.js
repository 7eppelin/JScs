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

    const scrollbar = useRef();
    const ul = useRef();

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

        if (target < 0 || target > ids.length - 1) return;

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
            <motion.div className='scrollbar'
                ref={scrollbar}
                variants={list} 
                initial='hidden' 
                animate='visible'>

                <ul ref={ul} >

                    {ids.map((id, i) => (
                        <SectionLink key={id} 
                            label={sections[id].name}
                            i={i}
                            scrollbar={scrollbar}
                            ul={ul}
                            updateDB={updateDB}
                            moveItem={moveItem}
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
    flex-basis: 160px;
    padding: 5px 0 5px 8px;

    .scrollbar {
        height: 100%;
        background: var(--black);
        transition: background 2s;
        overflow-y: auto;
    }

    ul {
        max-height: 100%;
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