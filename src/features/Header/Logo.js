import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

import { Link } from 'react-router-dom';


const Logo = () => (
    <Link to="/" >
        <StyledLogo>
            <span>JS</span>cs
        </StyledLogo>
    </Link>
)


const glow = keyframes`
    0% { color: var(--orange1) }
    50% { color: var(--orange3) }
    100% { color: var(--orange1) }
`

const StyledLogo = styled.div`
    display: inline-block;
    height: 100%;
    padding-top: 28px;
    font-size: 2rem;
    cursor: pointer;
    color: var(--white1);

    span {
        color: var(--orange1);
    }

    &:hover span {
        animation: ${glow} 1.6s ease-in-out infinite;
    }
`;

export default Logo;