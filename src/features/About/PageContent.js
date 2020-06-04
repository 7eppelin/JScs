import React from 'react';
import styled from 'styled-components/macro';

import Icon from 'components/Icon'
import Intro from './PageElements/Intro'
import Paragraph from './PageElements/Paragraph'
import List from './PageElements/List'

const PageContent = ({ 
    data, 
    isLastPage, 
    scrollDown,
    setAnimationDirection
}) => (
    <Div>
        {data.map((item, i) => {
            switch (item.type) {
                case 'intro':
                    return <Intro key={i} elem={item} />

                case 'paragraph':
                    return <Paragraph key={i} elem={item} />

                case 'list':
                    return <List key={i} elem={item}/>
                
                default: return null;
            }
        })}

       {!isLastPage && (
           <Button onClick={scrollDown}
                onMouseDown={() => setAnimationDirection('up')}>
                <Icon icon='down' size='32px' />
            </Button>
        )}
    </Div>
)

const Div = styled.div`
    padding: 40px 15%;

    strong {
        font-weight: 500;
        color: var(--orange2)
    }

    .tip {
        color: var(--gray2);
        transition: .2s;
    }
    .tip:hover {
        color: var(--white)
    }
`

const Button = styled.button`
    display: block;
    margin: 40px auto 0;
    width: 60px;
    transition: .25s;

    &:focus { outline: none }

    path { 
        fill: var(--white);
        transition: .25s;
    }

    &:hover {
        transform: translateY(5px)
    }

    &:hover path {
        fill: var(--orange1)
    }
`

export default PageContent