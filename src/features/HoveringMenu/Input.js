import React from 'react';
import styled from 'styled-components/macro';

import Icon from 'components/Icon'

const Input = ({ 
    inputRef,
    isShown,
    placeholder,
    submit
}) => (
    <Div isShown={isShown}>
        <input ref={inputRef} 
            placeholder={placeholder} />

        <button 
            onClick={submit}
            // prevent focus
            onMouseDown={e => e.preventDefault()} >
            <Icon icon='check-bold' size='1.15em' />
        </button>
    </Div>
)


const Div = styled.div`
    position: relative;
    padding: 0 3px;
    margin-top: 3px;
    overflow: hidden;
    transition: .12s;
    width: 225px;
    height: ${props => props.isShown ? '36px' : 0};

    input {
        border: none;
        width: 100%;
        padding: 10px 35px 10px 15px;
        background: var(--gray5);
        color: var(--gray1);
        outline: 1px solid transparent;
        outline-offset: -5px;
        box-shadow: inset 0 0 12px -5px black;
        transition: .25s;
        font-size: 1.3rem;
    }

    input:focus {
        outline: 1px solid var(--orange1);
        outline-offset: -1px;
    }

    button {
        position: absolute;
        background: var(--black);
        top: 4px;
        right: 7px;
        font-size: 1.3rem;
        height: 23px;
        width: 23px;
        border: 1px solid var(--gray5);
        border-radius: 3px;
        box-shadow: 0 0 6px -1px black;
    }

    button:hover path {
       fill: var(--orange1);
    }
`;

export default Input;