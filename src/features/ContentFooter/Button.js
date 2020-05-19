import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip';


const Button = ({ onClick, children, tooltip }) => {
    return (
        <Tooltip tip={tooltip} >
            <StyledButton onClick={onClick}>
                {children}
            </StyledButton>
        </Tooltip>
    )
}


const StyledButton = styled.button`
    margin: 0 1px;
    flex-basis: 60px;
    flex-grow: 1;
    padding: 10px;
    color: var(--orange1);
    outline: 1px solid transparent;
    cursor: pointer;
    transition: .15s;
    font-size: 1.2rem;

    &:hover {
        color: var(--orange3);
        outline: 1px solid var(--orange1);
    }

    &:active {
        color: var(--orange3);
        outline-offset: -2px;
    }
`;

export default Button;