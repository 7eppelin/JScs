import React from 'react';
import styled from 'styled-components/macro';

const Button = styled.button`
    outline: none;
    background: var(--gray6);
    color: ${props => props.readOnly ? 'var(--gray1)' : 'var(--green)'};
    padding: 8px 30px;
    position: absolute;
    z-index: 300;
    top: -2px;
    right: -2px;
    box-shadow: -1px 1px 15px -1px var(--black);
    transition: .15s;

    &:focus { outline: none }

    i {
        margin-left: 8px;
    }
`;

const ToggleReadOnly = ({ readOnly, toggle }) => (
    <Button onClick={toggle} readOnly={readOnly}>
        edit
        <i className="far fa-edit" />
    </Button>
)

export default ToggleReadOnly;