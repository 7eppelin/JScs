import React from 'react';
import styled from 'styled-components/macro';
import Tooltip from 'components/Tooltip';

const Btn = styled.button`
    display: inline-block;
    width: 45px;
    color: var(--gray2);
    text-shadow: 1px 1px 1px var(--gray4);
    padding: 10px 0;
    font-size: 1.4rem;
    text-align: center;
    transition: .15s;
    outline: none;
    cursor: pointer;

    &:focus { outline: none }
    &:hover { color: var(--orange2) }
    &.active { color: var(--orange2) }
`;


const HoveringButton = ({ handleClick, isActive, tooltip, children }) => (
    <Tooltip tip={tooltip}>
        <Btn onMouseDown={e => {
            // prevent focus
            e.preventDefault()
            handleClick(e)
        }} 
        className={isActive ? 'active' : ''}>
            {children}
        </Btn>
    </Tooltip>
)

export default HoveringButton;