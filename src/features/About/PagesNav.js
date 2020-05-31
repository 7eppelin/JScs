import React from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion'

import PagesNavItem from './PagesNavItem'


const PagesNav = ({ 
    pages, 
    activePage, 
    scrollPages,
    setAnimationDirection 
}) => (
    // PagesNavItem's height + margin-bottom * ...
    <Nav passiveHeight = {(16 + 45) * (pages.length - 1)}
        activeHeight={(16 + 45) * activePage}>

        {pages.map(page => (
            <PagesNavItem key={page}
                isActive={activePage === page}
                handleClick={() => scrollPages(page)}
                handleMouseDown={() => {
                    if (page > activePage) setAnimationDirection('up')
                    if (page < activePage) setAnimationDirection('down')
                }} />
        ))}
        <div className='passive-line' />
        <div className='active-line' />
    </Nav>
)


const Nav = styled.nav`
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;

    & > div {
        position: absolute;
        top: 5px;
        left: 7px;     
        width: 2px;  
        z-index: 1;
    }

    .passive-line {
        background: var(--gray3);
        height: ${props => props.passiveHeight + 'px'};
    }

    .active-line {
        background: var(--orange2);
        z-index: 2;
        height: ${props => props.activeHeight + 'px'};
        transition: .25s;

        &:after {
            content: '';
            position: absolute;
            top: ${props => `${props.activeHeight - 7}px`};
            left: -9px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--orange2);
            border-radius: 50%;
            transition: .25s;
        }
    }
`


export default PagesNav