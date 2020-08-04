import React from 'react'
import styled from 'styled-components/macro';

const ApiDescription = ({ attributes, children }) => (
    <Div {...attributes}>
        {children}
    </Div>
)

const Div = styled.div`
    font-size: 1.35rem;
    margin: 10px 20px 0;
`

export default ApiDescription