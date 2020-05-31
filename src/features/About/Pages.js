import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion'

import content from './content.js'
import { useMount } from 'utils'

import AnimatedPage from './AnimatedPage'
import Page from './Page'
import PagesNav from './PagesNav'

const Pages = () => {
    const justMounted = useMount()
    const [activePage, setActivePage] = useState(0)

    // we want the pages to be animated 
    // in the opposite direction of scrolling
    const [animationDirection, setAnimationDirection] = useState('down')

    const scrollPages = useCallback(target => {
        if (target < 0 || target >= content.length) return
        setActivePage(target)
    }, [activePage])

    return (
        <Div>
            <AnimatePresence exitBeforeEnter>
                <AnimatedPage
                    key={activePage}
                    pageIndex={activePage}
                    justMounted={justMounted}
                    scrollPages={scrollPages}
                    animationDirection={animationDirection}
                    setAnimationDirection={setAnimationDirection}>

                    <Page content={content[activePage]} />
                </AnimatedPage>
            </AnimatePresence>

            <PagesNav 
                pages={content.map((item, i) => i)}
                scrollPages={scrollPages}
                activePage={activePage}
                setAnimationDirection={setAnimationDirection} />
        </Div>
    )
}

const Div = styled.div`
    overflow: hidden;
    height: 100%;
`

export default Pages