import React from 'react';
import styled from 'styled-components/macro';

import parseText from './parseText'

const Paragraph = ({ elem }) => (
    <P>{parseText(elem.text)}</P>
)


const P = styled.p`
    margin: 25px 0;
    line-height: 1.55;
`

export default Paragraph