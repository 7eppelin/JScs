import React from 'react'
import styled from 'styled-components/macro'

const FormStatus = ({ status }) => (
    <Div className={status.type === 'error' ? 'error' : ''}>
        {status.message}
    </Div>
) 

const Div = styled.div`
    margin: 10px auto;
    height: 60px;
    width: 80%;
    line-height: 1.3;
    color: var(--green);

    &.error {
        color: var(--red);
    }
`

export default FormStatus