import React from 'react'
import styled from 'styled-components/macro'

import { useRouteMatch } from 'react-router-dom';
import { useMount, usePrevious } from 'utils'

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

    const { params, url } = useRouteMatch('/:secName?/:subsec?/:feature?')
    const prevSection = usePrevious(params.secName)

    // if transitioning from the front-page to the content section
    // delay SubsectionMenu and ContentEditor's animations
    const shouldDelayAnimation = params.secName && !prevSection

    return (
        <StyledMain>

            <About isMount={isMount} />

            <Nav activeSection={params.secName}
                shouldDelayAnimation={shouldDelayAnimation} />

            <Content url={url}
                isMount={isMount}
                shouldDelayAnimation={shouldDelayAnimation} />

        </StyledMain>
    )
}

export default Main;