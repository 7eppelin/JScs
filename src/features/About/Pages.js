import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion'

import content from './content.js'
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

    const justMounted = useRef(true)
    useEffect(() => {
        setTimeout(() => justMounted.current = false, 100)
    })

    return (
        <Div>
            <AnimatePresence exitBeforeEnter>
                <Page
                    key={activePage}
                    content={content[activePage]} 
                    scrollPages={scrollPages}
                    pageIndex={activePage} 
                    justMounted={justMounted.current}
                    animationDirection={animationDirection}
                    setAnimationDirection={setAnimationDirection}
                />
            </AnimatePresence>
        </Div>
    )
}

const Div = styled.div`
    overflow: hidden;
    height: 100%;
`

export default Pages