import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { scroll } from 'utils'


const SectionLink = ({ 
    label, 
    i, 
    scrollbar,
    ul,
    moveItem, 
    updateDB 
}) => {
    const [ isDragging, setDragging ] = useState(false);
    const elemRef = useRef();
    const dragOriginY = useMotionValue(0);

    return (
        <StyledLink
            variants={variants}
            ref={elemRef}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            dragOriginY={dragOriginY}
            isDragging={isDragging}
            onDrag={(_, info) => {
                // if the dragged elem was moved by 32px down, 
                // swap it's position with the next elem
                if (info.point.y > 30) moveItem(i, i + 1);
                // if it was moved up, swap with prev elem 
                if (info.point.y < -30) moveItem(i, i - 1);

                // scroll while dragging
                scroll(scrollbar.current, info.delta.y, dragOriginY)
            }}
            onDragStart={() => {
                setDragging(true)
            }}
            onDragEnd={() => {
                setDragging(false);
                updateDB();
            }}
            positionTransition={({ delta }) => {
                if (isDragging) {
                    dragOriginY.set(dragOriginY.get() + delta.y)
                }
                return !isDragging;
            }}>

            <NavLink draggable={false} 
                to={`/${label}`} 
                activeClassName='active'>
                    {label}
            </NavLink>

        </StyledLink>
    )
}


const StyledLink = styled(motion.li)`
    position: relative;
    margin-bottom: 2px;
    z-index: ${props => props.isDragging ? 5 : 0 };
    box-shadow: ${props => props.isDragging && '0 0 30px -6px black'};

    a {
        display: block;
        padding: 13px;
        height: 100%;
        border-radius: 3px;
        background: ${props => props.isDragging ? 'var(--gray4)' : 'var(--gray5)'};
        color: var(--white2);
        transition: .2s;
    }

    a:hover {
        background: var(--gray3);
    }

    a.active {
        background: var(--gray3);
        color: var(--white1);
    }
`;


const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}


export default SectionLink;