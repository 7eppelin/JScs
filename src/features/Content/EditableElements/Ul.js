import React from 'react';
import styled from 'styled-components/macro';


const StyledUl = styled.ul`
    padding: 15px 30px 10px 50px;
`;

const Ul = ({ attributes, children }) => (
    <StyledUl {...attributes}>
        {children}
    </StyledUl>
);

export default Ul;