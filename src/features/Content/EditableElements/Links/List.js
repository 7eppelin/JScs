import React from 'react';
import styled from 'styled-components/macro'

import Link from './Link'


const List = ({ 
    readOnly,
    links, 
    edit, 
    deleteLink 
}) => (
    <Wrapper className='scrollbar'>
        <ul>
            {links.map(({ text, href }, index) => (
                <Link key={text}
                    text={text}
                    href={href}
                    readOnly={readOnly}
                    editLink={() => edit(index)}
                    deleteLink={() => deleteLink(index)} />
            ))}
        </ul>
    </Wrapper>
)


const Wrapper = styled.div`
    height: 100%;
    width: 0;
    min-width: 100%;
    padding-right: 40px;
    overflow-x: auto;

    ul {
        height: 100%;
        padding-right: 40px;
        display: flex;
        align-items: center;
    }
`

export default List;