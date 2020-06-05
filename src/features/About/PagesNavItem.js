import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip'

const PagesNavItem = ({ 
    isActive,
    tooltip,
    handleClick, 
    handleMouseDown 
}) => (
    <Tooltip tip={tooltip} 
        position='left'
        offset={13} >

        <Button 
            isActive={isActive}
            onMouseDown={handleMouseDown}
            onClick={handleClick}>

            <div />
        </Button>

    </Tooltip>
)


const Button = styled.button`
    position: relative;
    z-index: 5;
    width: 16px;
    height: 16px;
    padding: 4px;
    border-radius: 50%;
    background: var(--gray6);

    &:not(:last-child) {
        margin-bottom: 45px;
    }

    div {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => props.isActive ? 'var(--orange1)' : 'var(--white)'};
        transition: .2s;
    }

    &:hover div {
        background: var(--orange3);
    }

    &:focus { outline: none }
`


export default PagesNavItem