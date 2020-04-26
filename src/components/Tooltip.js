import React from 'react';
import styled from 'styled-components/macro';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';


const StyledTippy = styled(Tippy)`
    background: var(--black);
    color: var(--white);
    padding: 6px 10px;
    border: 1px solid var(--gray4);
    box-shadow: 0 0 5px 1px var(--black);
    font-size: 1.2rem;
    opacity: .8;
`;

// https://atomiks.github.io/tippyjs/v6/all-props/

const Tooltip = ({ 
    tip, 
    position = 'top',
    offset = 5,
    children 
}) => (
    <StyledTippy animation='scale'
        interactive={true}
        offset={[0, offset]}
        content={tip}
        delay={[200, 50]}
        duration={150}
        inertia={true}
        maxWidth={320}
        placement={position} >
        {children}
    </StyledTippy>
)

export default Tooltip;