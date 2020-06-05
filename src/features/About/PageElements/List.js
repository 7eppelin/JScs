import React from 'react';
import styled from 'styled-components/macro';

import parseText from './parseText'


const List = ({ elem }) => (
    <Ul>
        {elem.items.map((item, i) => (
            <li key={i}>
                {parseText(item)}
            </li>
        ))}
    </Ul>
)

const Ul = styled.ul`
    font-size: 1.45rem;
    padding-left: 25px;
    margin-bottom: 25px;

    li {
        list-style: disc;
    }

    li:not(:last-child) {
        margin-bottom: 10px;
    }
`

export default List