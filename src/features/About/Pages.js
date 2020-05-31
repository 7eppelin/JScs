import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion'

import content from './content.js'
import { useMount } from 'utils'

import AnimatedPage from './AnimatedPage'
import Page from './Page'

const Pages = () => {
    const [activePage, setActivePage] = useState(0)

    // we want the pages to be animated 
    // in the opposite direction of scrolling
    const [animationDirection, setAnimationDirection] = useState('down')

    const scrollPages = useCallback((direction, index) => {
        const lastPage = content.length - 1

        if (direction === 'up' && index > 0) {
            setActivePage(activePage - 1)
        }
        if (direction === 'down' && index !== lastPage) {
            setActivePage(activePage + 1)
        }
    }, [activePage])

    const justMounted = useMount()

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
        </Div>
    )
}

const Div = styled.div`
    overflow: hidden;
    height: 100%;
`

export default Pages