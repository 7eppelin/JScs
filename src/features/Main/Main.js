import React from 'react'
import styled from 'styled-components/macro'
import { AnimatePresence } from 'framer-motion'

import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { usePrevious, useMount } from 'utils'

import Nav from 'features/Nav/Nav'
import About from 'features/About/About'
import Content from 'features/Content/Content'


const Main = () => {
    const location = useLocation()
    const match = useRouteMatch('/:secName?/:subsec?/:feature?')
    const secName = match.params.secName;
    const prevSection = usePrevious(secName)

    // if transitioning from the front-page to the content section
    // delay SubsectionMenu and ContentEditor's animations
    const isMount = useMount()
    const delayAnimation = isMount ? false : 
        secName && !prevSection ? true : false


    return (
        <StyledMain>

            <Nav activeSection={secName}
                delayAnimation={delayAnimation} />

            <AnimatePresence 
                initial={false} 
                exitBeforeEnter>

                <Switch location={location} 
                    key={secName ? 'content' : 'about'}>

                    <Route exact path='/'>
                        <About />
                    </Route>

                    <Route path='/:secName'>
                        <Content delayAnimation={delayAnimation} />
                    </Route>
                    
                </Switch>
            </AnimatePresence>

        </StyledMain>
    )
}


// height = 100% - header height - footer height
const StyledMain = styled.main`
    position: relative;
    height: calc(100% - 80px - 45px);
    overflow: hidden;
`;

export default Main;