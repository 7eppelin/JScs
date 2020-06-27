import React from 'react';
import styled from 'styled-components/macro';


const ApiTitle = ({ attributes, children }) => (
    <Div {...attributes}>
            {children}
    </Div>
)


const Div = styled.div`
    color: var(--yellow);
    font-size: 1.5rem;
`

export default ApiTitle