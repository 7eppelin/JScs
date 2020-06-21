import React from 'react';
import styled from 'styled-components/macro';
import Tooltip from 'components/Tooltip';


const Button = ({ 
    handleMouseDown, 
    isActive, 
    tooltip, 
    children 
}) => (
    <Tooltip tip={tooltip}>
        <Btn onMouseDown={e => {
            // prevent focus
            e.preventDefault()
            if (e.button !== 0) return;
            handleMouseDown(e)
        }} 
        className={isActive ? 'active' : ''}>
            {children}
        </Btn>
    </Tooltip>
)


const Btn = styled.button`
    display: inline-block;
    width: 55px;
    color: var(--white2);
    text-shadow: 1px 1px 1px var(--gray4);
    padding: 10px 0;
    font-size: 1.4rem;
    text-align: center;
    transition: .15s;
    outline: none;
    cursor: pointer;

    &:focus { outline: none }
    &:hover,
    &.active { color: var(--orange2) }
    &:hover path,
    &.active path { fill: var(--orange2) }
`;


export default Button;