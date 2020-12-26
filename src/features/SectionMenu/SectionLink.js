import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { scroll } from 'utils'


const SectionLink = ({ 
    label, 
    handleDrag,
    scrollbar,
    updateDB 
}) => {
    const [ isDragging, setDragging ] = useState(false);
    const elemRef = useRef();
    const dragOriginY = useMotionValue(0);

    return (
        <StyledLink variants={variants}
            ref={elemRef}
            className={isDragging && 'dragging'}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            dragOriginY={dragOriginY}
            onDrag={(_, info) => {
                handleDrag(info.point.y)
                scroll(scrollbar.current, info.delta.y, dragOriginY)
            }}
            onDragStart={() => setDragging(true)}
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
    z-index: 1;

    &.dragging {
        box-shadow: 0 0 30px -6px black;
        z-index: 5;
    }

    &:not(.dragging) {
        transition: z-index 0.05s 0.25s;
    }

    &.dragging a {
        background: var(--gray3);
    }

    a {
        display: block;
        padding: 13px;
        height: 100%;
        border-radius: 3px;
        background: var(--gray5);
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
    hidden: { 
        opacity: 0,
        scale: .8 
    },
    visible: { 
        opacity: 1,
        scale: 1 
    }
}


export default SectionLink;