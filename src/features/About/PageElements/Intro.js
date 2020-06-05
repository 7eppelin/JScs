import React from 'react';
import styled from 'styled-components/macro';

import parseText from './parseText'
import Icon from 'components/Icon'

const Intro = ({ elem }) => (
    <Div>
        <div>
            <Icon icon={elem.icon} size={32} />
        </div>
        {parseText(elem.text)}
    </Div>
)

const Div = styled.div`
    width: 70%;
    margin: 16px auto 40px;
    padding: 25px 35px;
    text-align: center;
    border: 1px solid var(--gray4);
    border-radius: 3px;

    & > div {
        text-align: center;
        margin-bottom: 25px;

        path {
            fill: var(--white)
        }
    }
`

export default Intro