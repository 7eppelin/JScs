import React from 'react';
import styled from 'styled-components/macro';


const Heading = ({ text }) => (
    <H2>{text}</H2>
)

const H2 = styled.h2`
    color: var(--white1);
    padding-top: 15px;
    font-size: 2rem;
    text-align: center;
`;

export default Heading