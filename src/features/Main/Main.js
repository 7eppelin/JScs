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
    // prevent animations on the first render
    const isFirstRender = useMount()

    return (
        <StyledMain>
            <About isFirstRender={isFirstRender} />
            <Nav />
            <Content isFirstRender={isFirstRender} />
        </StyledMain>
    )
}

export default Main;