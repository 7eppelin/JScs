import React from 'react';
import styled from 'styled-components/macro';


const ApiDesc = ({ attributes, children }) => (
    <Div {...attributes}>
            {children}
    </Div>
)


const Div = styled.div`
`

export default ApiDesc