import styled from 'styled-components/macro';


const StyledAddForm = styled.form`
    background-color: var(--gray6);
    background-size: 20px 20px;
    width: 280px;
    border: 1px solid var(--gray5);
    box-shadow: 0 2px 15px -1px var(--black);
    color: var(--white);
    font-size: 1.2rem;
    text-align: center;

    h3 {
        font-weight: normal;
        color: var(--orange1);
        margin: 30px;
        font-size: 1.2rem;
    }

    input {
        background-color: var(--gray5);
        color: var(--white);
        box-shadow: inset 0 0 12px -1px var(--black);
        padding: 10px 15px;
        border: 1px solid var(--gray5);
        width: 90%;
        margin: 0 auto;
        transition: .2s;
        outline: 1px solid transparent;
        outline-offset: -7px;
    }

    input:focus {
        box-shadow: inset 0 0 12px -2px var(--black);
        background-color: var(--gray4);
        outline: 1px solid var(--brown);
        outline-offset: 0px;
    }

    div {
        margin: 10px auto;
        height: 44px;
        width: 80%;
        line-height: 1.3;
        color: var(--green);
    }

    div.error {
        color: var(--red);
    }

    button {
        outline: none;
        font-size: 1.1rem;
        display: inline-block;
        padding: 10px;
        width: 50%;
        text-align: center;
        background-color: var(--gray5);
        border-top: 1px solid var(--gray4);
        color: var(--gray1);
        transition: .2s;
    }

    button:hover {
        background: var(--gray4);
        color: var(--white);
    }

    button:focus { outline: none }
`;

export default StyledAddForm;