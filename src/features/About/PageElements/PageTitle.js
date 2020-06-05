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
    color: var(--orange2);
    padding: 60px 0 40px;
`

export default PageTitle