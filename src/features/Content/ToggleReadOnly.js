import React from 'react';
import styled from 'styled-components/macro';

import Icon from 'components/Icon'


const ToggleReadOnly = ({ readOnly, toggle }) => (
    <Button onClick={toggle} readOnly={readOnly}>
        edit
        <Icon icon='edit-doc'
            size='1.4em' />
    </Button>
)

const Button = styled.button`
    outline: none;
    background: var(--gray6);
    color: ${props => props.readOnly ? 'var(--white2)' : 'var(--green)'};
    padding: 8px 30px;
    position: absolute;
    z-index: 10;
    top: -2px;
    right: -2px;
    box-shadow: -3px 3px 12px -3px var(--black);
    transition: .15s;
    border-radius: 0 0 0 3px;

    &:focus { outline: none }

    svg {
        margin-left: 8px;
        margin-top: -2px;
    }

    path {
        fill: ${props => props.readOnly ? 
            'var(--white2)' : 'var(--green)'
        };
    }
`;

export default ToggleReadOnly;