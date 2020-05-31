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
    // line's height = (item's margin-bottom + height) * activePage
    <Nav height={(45 + 16) * activePage}>

        {pages.map(page => (
            <PagesNavItem key={page}
                isActive={activePage === page}
                handleClick={() => scrollPages(page)}
                handleMouseDown={() => {
                    if (page > activePage) setAnimationDirection('up')
                    if (page < activePage) setAnimationDirection('down')
                }} />
        ))}
        <div />
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
        background: var(--orange2);
        width: 2px;
        height: ${props => `${props.height}px`};
        transition: .25s;

        &:after {
            content: '';
            position: absolute;
            top: ${props => `${props.height - 7}px`};
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