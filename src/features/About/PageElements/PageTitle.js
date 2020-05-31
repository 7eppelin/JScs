import React from 'react';
import styled from 'styled-components/macro';


const PageTitle = ({ text }) => (
    <Title>
        {text}
    </Title>
)

const Title = styled.h2`
    text-align: center;
    background: var(--gray5);
    color: var(--white);
    padding: 35px 0;
`

export default PageTitle