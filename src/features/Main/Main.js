import React from 'react'
import styled from 'styled-components/macro'

import { useRouteMatch } from 'react-router-dom';
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

    const { params } = useRouteMatch('/:secName?')

    return (
        <StyledMain>
            <About isMount={isMount} />
            <Nav activeSection={params.secName} />
            <Content isMount={isMount} />
        </StyledMain>
    )
}

export default Main;