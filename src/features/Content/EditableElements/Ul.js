import React from 'react';
import styled from 'styled-components/macro';


const StyledUl = styled.ul`
    padding: 15px 23% 10px 15%;
`;

const Ul = ({ attributes, children }) => (
    <StyledUl {...attributes}>
        {children}
    </StyledUl>
);

export default Ul;