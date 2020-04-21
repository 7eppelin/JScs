import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';


const StyledLink = styled.a`
    display: block;
    height: 100%;
`;


const Link = ({ navigateTo, children }) => {
    const history = useHistory();

    const navigate = e => {

    }

    return (
        <StyledLink href='#' onClick={() => history.push(navigateTo)} >
            {children}
        </StyledLink>
    )
}

export default Link;