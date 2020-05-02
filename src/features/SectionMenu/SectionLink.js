import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion';
import { NavLink } from 'react-router-dom';


const SectionLink = ({ label, i, moveItem }) => {
    const [ isDragging, setDragging ] = useState(false);
    const dragOriginY = useMotionValue(0);

    return (
        <StyledLink
            // variants are for the initialization animation only
            // not related to d'n'd
            variants={variants}

            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            dragOriginY={dragOriginY}
            isDragging={isDragging}
            
            onDrag={(e, info) => {
                const dragged = info.point.y;
                // if dragged elem was moved down by more than 32 px,
                // swap positions with the next elem
                if (dragged > 32) moveItem(i, i + 1)
                // if it was moved up, swap with prev elem
                if (dragged < -32) moveItem(i, i - 1)
            }}

            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            positionTransition={({ delta }) => {
                if (isDragging) {
                    dragOriginY.set(dragOriginY.get() + delta.y)
                }
                return !isDragging;
            }}
        >

            <NavLink to={`/${label}`} activeClassName='active'>
                {label}
            </NavLink>

        </StyledLink>
    )
}


const StyledLink = styled(motion.li)`
    position: relative;
    margin: 2px 0;
    background-color: var(--gray5);
    z-index: ${props => props.isDragging ? 5 : 0 };
    transition-delay: ${props => props.isDragging ? 0 : 'z-index 0.3' };
    border: ${props => props.isDragging ? 
        '1px solid var(--black)' : 
        '1px solid transparent' };
    box-shadow : ${props => props.isDragging ? '0 0 18px -3px black' : ''};

    a {
        display: block;
        padding: 13px;
        height: 100%;
        border-radius: 3px;
        color: var(--gray1);
        transition: .2s;
    }

    a:hover {
        background: var(--gray4);
        color: var(--white);
    }

    a.active {
        background: var(--gray4);
        box-shadow: inset 0 0 15px 0 var(--gray6);
        color: var(--white);
    }
`;


const variants = {
    hidden: { 
        opacity: 0,
        scale: 0.7,
        y: -20
    },
    visible: { 
        opacity: 1,
        scale: 1,
        y: 0
    },
}


export default SectionLink;