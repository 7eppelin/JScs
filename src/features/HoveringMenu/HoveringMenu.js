import React, { Suspense, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import useHoveringMenu from './useHoveringMenu'
import Portal from 'components/Portal';
const Menu = React.lazy(() => import('./Menu'));


const HoveringMenu = () => {
    const inputRef = useRef(null)
    const isShown = useHoveringMenu(inputRef)

    return (
        <AnimatePresence>
            {isShown && (
                <Portal>
                    <Suspense fallback=' '>
                        <Menu inputRef={inputRef} />
                    </Suspense>
                </Portal>
            )}
        </AnimatePresence>
    )
}

export default HoveringMenu;