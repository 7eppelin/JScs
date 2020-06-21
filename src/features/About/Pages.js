import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { AnimatePresence } from 'framer-motion'

import content from './content/'

import AnimatedPage from './AnimatedPage'
import Page from './Page'
import PagesNav from './PagesNav'


const Pages = () => {
    const [activePage, setActivePage] = useState(0)
    const wheelRef = useRef()

    // we want the pages to be animated 
    // in the opposite direction of scrolling
    const [animationDirection, setAnimationDirection] = useState('down')

    const scrollPages = useCallback(target => {
        if (target < 0 || target >= content.length) return
        setActivePage(target)
    }, [])

    return (
        <Div>
            <AnimatePresence 
                exitBeforeEnter 
                initial={false}>

                <AnimatedPage key={activePage}
                    pageIndex={activePage}
                    lastPage={content.length - 1}
                    scrollPages={scrollPages}
                    animationDirection={animationDirection}
                    setAnimationDirection={setAnimationDirection}
                    wheelRef={wheelRef} >

                    <Page content={content[activePage]}
                        isLastPage={activePage === content.length - 1}
                        setAnimationDirection={setAnimationDirection}
                        scrollDown={() => setActivePage(activePage + 1)} />
                </AnimatedPage>
            </AnimatePresence>

            <PagesNav 
                pages={content.map(item => item.title)}
                scrollPages={scrollPages}
                activePage={activePage}
                setAnimationDirection={setAnimationDirection}
                wheelRef={wheelRef} />
        </Div>
    )
}

const Div = styled.div`
    overflow: hidden;
    height: 100%;
`

export default Pages