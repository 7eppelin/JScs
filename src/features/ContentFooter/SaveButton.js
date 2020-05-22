
import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'


const SaveButton = ({ save }) => (
    <Tooltip tip="Save changes">
        <Button
            onClick={save}>
                <Icon icon='cloud-download' />
        </Button>
    </Tooltip>
)

const Button = styled.button`
    margin: 20px;
    margin-left: 50px;
    font-size: 2.5rem;
    background-color: transparent;
    margin-right: 30px;

    path { 
        fill: var(--orange1);
    }

    &:hover path { fill: var(--orange2) }
    &:active { transform: scale(.96) }
    &:focus { outline: none }
`

export default SaveButton