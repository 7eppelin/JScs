import React, { Suspense, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import useHoveringMenu from './useHoveringMenu'
const Menu = React.lazy(() => import('./Menu'));


const HoveringMenu = () => {
    const inputRef = useRef(null)
    const isShown = useHoveringMenu(inputRef)

    return (
        <AnimatePresence>
            {isShown && (
                <Suspense fallback=' '>
                    <Menu inputRef={inputRef} />
                </Suspense>
            )}
        </AnimatePresence>
    )
}

export default HoveringMenu;