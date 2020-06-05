import React from 'react';
import styled from 'styled-components/macro';

import PagesNavItem from './PagesNavItem'
import PagesNavWheel from './PagesNavWheel'


const PagesNav = ({ 
    pages, 
    activePage, 
    scrollPages,
    setAnimationDirection,
    wheelRef
}) => (
    // PagesNavItem's height + margin-bottom * ...
    <Nav passiveHeight = {(16 + 45) * (pages.length - 1)}
        activeHeight={(16 + 45) * activePage}>

        <PagesNavWheel ref={wheelRef} />

        {pages.map((page, i) => (
            <PagesNavItem key={page}
                tooltip={page}
                isActive={activePage === i}
                handleClick={() => {
                    scrollPages(i)
                    wheelRef.current.spin(0)
                }}
                handleMouseDown={() => {
                    if (i > activePage) setAnimationDirection('up')
                    if (i < activePage) setAnimationDirection('down')
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

    .passive-line,
    .active-line {
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
        transition: .35s;

        &:after {
            content: '';
            position: absolute;
            top: ${props => `${props.activeHeight - 7}px`};
            left: -9px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--orange2);
            border-radius: 50%;
            transition: .35s;
        }
    }
`


export default PagesNav