import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

import Icon from 'components/Icon'

const FormStatus = ({ status }) => (
    <Div className={status.type === 'error' ? 'error' : ''}>
        {status.type === 'pending' ? 
            <Icon icon='cog2' size="32px" />
            : status.message
        }
    </Div>
)

const spin = keyframes`
    0% { transform: rotate(0deg) scale(1) }
    50% { transform: rotate(180deg) scale(1.2) }
    100% { transform: rotate(359deg) scale(1) }
`

const Div = styled.div`
    margin: 10px auto;
    height: 60px;
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.3;
    color: var(--green);

    span { color: var(--orange2) }

    &.error {
        color: var(--red);
    }

    svg {
        margin-top: 10px;
        animation: ${spin} 1s ease-in-out infinite;
    }
`

export default FormStatus