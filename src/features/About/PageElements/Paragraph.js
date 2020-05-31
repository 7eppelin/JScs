import React from 'react';
import styled from 'styled-components/macro';


const Paragraph = ({ text }) => (
    <P>
        {text}
    </P>
)


const P = styled.p`
    margin: 20px 0;
`

export default Paragraph