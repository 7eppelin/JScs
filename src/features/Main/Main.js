import React from 'react'
import styled from 'styled-components/macro'

import { useMount } from 'utils'

import About from 'features/About/About'
import Nav from 'features/Nav/Nav'
import Content from 'features/Content/Content'


// height = 100% - header height - footer height
const StyledMain = styled.main`
    position: relative;
    height: calc(100% - 80px - 45px);
    overflow: hidden;
`;


const Main = () => {
    // prevent animations on mount
    const isMount = useMount()

    return (
        <StyledMain>
            <About isMount={isMount} />
            <Nav />
            <Content isMount={isMount} />
        </StyledMain>
    )
}

export default Main;