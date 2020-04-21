import React from 'react';
import styled from 'styled-components/macro';


const StyledToggler = styled.button`
    font-size: 1.8rem;
    padding: 5px;
    margin-top: 20px;
    background-color: var(--black);
    color: var(--white);
    border-radius: 50%;
    border: 1px solid var(--gray4);
    box-shadow: 0 0 6px 1px var(--black);
    transition: .25s;
    outline: none;

    &:focus {
        outline: none;
    }

    i {
        display: block;
        text-align: center;
        width: 32px;
        height: 32px;
        padding-top: 7px;
    }

    &.toggled {
        transform: rotate(135deg);
    }
`;

const AddFormToggler = ({ toggle, isToggled }) => (
    <StyledToggler onClick={() => toggle(!isToggled)}
            className={isToggled ? 'toggled' : ''} >
        <i className="fas fa-plus"></i>
    </StyledToggler>
);

export default AddFormToggler;