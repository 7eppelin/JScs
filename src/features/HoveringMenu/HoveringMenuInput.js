import React from 'react';
import styled from 'styled-components/macro';

const Div = styled.div`
    position: relative;
    padding: 0 3px;
    margin-top: 3px;
    overflow: hidden;
    transition: .12s;
    width: 210px;
    height: ${props => props.isShown ? '36px' : 0};

    input {
        border: none;
        width: 100%;
        padding: 10px 32px 10px 15px;
        background: var(--gray5);
        color: var(--gray1);
        outline: 1px solid transparent;
        outline-offset: -5px;
        box-shadow: inset 0 0 8px -1px var(--black);
        transition: .25s;
        font-size: 1.3rem;
    }

    input:focus {
        outline: 1px solid var(--orange1);
        outline-offset: -1px;
        /* border: none; */
    }

    button {
        position: absolute;
        background: var(--black);
        top: 5px;
        right: 6px;
        font-size: 1.3rem;
        padding: 4px;
        border: 1px solid var(--gray5);
        border-radius: 3px;
        box-shadow: 0 0 5px 0 var(--black);
        color: var(--white);
        opacity: ${props => props.isShown ? 1 : 0};
        transition: .5s;
    }

    button:hover {
        color: var(--orange1);
    }
`;


const HoveringMenuInput = ({ 
    inputRef,
    inputType,
    placeholder,
    submit,
}) => (
    <Div isShown={inputType !== null}>
        <input ref={inputRef} 
            placeholder={placeholder} />

        <button onClick={submit} >
            <i className="fas fa-check-double"/>
        </button>
    </Div>
)

export default HoveringMenuInput;