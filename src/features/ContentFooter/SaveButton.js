
import React from 'react';
import styled from 'styled-components/macro';

import Tooltip from 'components/Tooltip'


const SaveButton = ({ save }) => (
    <Tooltip tip="Save changes">
        <Button className='control-btn' 
            onClick={save}>
                <i className="far fa-save" />
        </Button>
    </Tooltip>
)

const Button = styled.button`
    margin: 20px;
    margin-left: 50px;
    font-size: 2.5rem;
    color: var(--orange1);
    background-color: transparent;
    margin-right: 30px;

    &:hover i { color: var(--orange3) }
    &:active { transform: scale(.96) }
    &:focus { outline: none }
`

export default SaveButton