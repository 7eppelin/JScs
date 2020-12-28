import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion'
import { NavLink } from 'react-router-dom'


const FeatureItem = ({ feature, handleDrag, saveNewOrder }) => {
    const [ isDragging, setDragging ] = useState(false)
    const dragOriginY = useMotionValue(0);
    const { name, sectionName, subsecName } = feature;

    return (
        <StyledItem drag='y'
            dragElastic={1}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragOriginY={dragOriginY}
            isDragging={isDragging}
            animate={isDragging ? 
                { zIndex: 5 } : 
                { zIndex: 0, transition: {delay: 0.3} } 
            }
            onDrag={(_event, info) => handleDrag(info.point.y)}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
                setDragging(false)
                saveNewOrder()
            }}
            positionTransition={({ delta }) => {
                if (isDragging) {
                    dragOriginY.set(dragOriginY.get() + delta.y)
                }
                return !isDragging
            }} >

            <NavLink activeClassName='active'
                draggable={false}
                to={`/${sectionName}/${subsecName}/${name}`} >
                    {name}
            </NavLink>
        </StyledItem>
    )
}


const StyledItem = styled(motion.li)`
    box-shadow: ${props => props.isDragging && '0 0 30px -6px black'};
    position: relative;
    z-index: ${props => props.isDragging ? 5 : 0 };

    a {
        display: block;
        height: 100%;
        padding: 7px;
        padding-left: 36px;
        font-size: 1.4rem;
        text-align: left;
        background: ${props => props.isDragging ? 'var(--gray4)' : 'var(--gray3)'};
        color: ${props => props.isDragging ? 'var(--orange2)' : 'var(--white2)'};
    }

    a:hover {
        background: var(--gray4);
        color: var(--orange2);
    }

    a.active {
        background: var(--gray4);
        color: var(--orange2);
    }
`;

export default FeatureItem;