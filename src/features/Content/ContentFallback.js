import React from 'react';
import styled from 'styled-components/macro'

const ContentFallback = () => (
    <Fallback>
        <Header />
        <Panel />
        <Content />
    </Fallback>
)


const Fallback = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 6px 9px;
    height: calc(100% - 12px);; 
`

const Header = styled.div`
    height: 134px;
    background: var(--gray4);
`

const Panel = styled.div`
    height: 78px;
`

const Content = styled.div`
    background: var(--gray5);
    margin-bottom: 42px;
    height: 100%;
`

export default ContentFallback