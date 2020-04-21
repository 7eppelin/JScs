import styled from 'styled-components/macro';


const StyledAddForm = styled.form`
    background-color: var(--gray6);
    background-size: 20px 20px;
    width: 280px;
    height: 260px;
    border: 1px solid var(--gray5);
    box-shadow: 0 2px 15px -1px var(--black);
    color: var(--white);
    font-size: 1.2rem;
    text-align: center;

    h3 {
        font-weight: normal;
        color: var(--orange1);
        margin: 30px;
    }

    input {
        background-color: var(--gray6);
        color: var(--white);
        box-shadow: inset 0 0 12px -1px var(--black);
        padding: 10px 15px;
        border: 1px solid var(--gray5);
        width: 90%;
        margin: 0 auto;
        transition: .2s;
        outline: none;
    }

    input:focus {
        box-shadow: inset 0 0 12px -2px var(--black);
        background-color: var(--gray4);
        border: 1px solid var(--brown);
    }

    div {
        margin: 12px auto;
        height: 36px;
        width: 80%;
        color: var(--green);
    }

    div.error {
        color: var(--red);
    }

    button {
        font-size: 1.2rem;
        display: inline-block;
        margin: 0 6px;
        padding: 10px 20px;
        background-color: var(--gray4);
        border: 1px solid var(--gray3);
        box-shadow: 0 1px 10px -1px var(--black);
        color: var(--white);
    }
`;

export default StyledAddForm;